# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  devise :omniauthable, omniauth_providers: %i[google_oauth2]
  include DeviseTokenAuth::Concerns::User

  has_many :letters, dependent: :destroy
  has_many :posts, through: :letters

  before_validation :set_default_uuid, on: :create

  scope :per_page, ->(page) {
    page = page.to_i
    page = 1 if page < 1
    limit(48).offset((page - 1) * 48)
  }


  def self.find_or_create_by_oauth(auth)
    transaction do
      user = find_by(uid: auth.uid)
      if user.nil?
        newName = auth.info.name
        if newName.length > 10
          newName = newName[0..9]
        end
        user = User.new(uid: auth.uid, provider: auth.provider, name: newName)
        unless user.save
          raise ActiveRecord::Rollback
        end
      end
      user
    end
  end

  def set_default_uuid
    new_uuid = SecureRandom.uuid
    encode_uuid = Base64.urlsafe_encode64([new_uuid.delete('-')].pack("H*")).tr('=', '')
    self.uuid = encode_uuid
  end

  def as_custom_index_json
    {
      uuid: uuid,
      name: name
    }
  end
end
