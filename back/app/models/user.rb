# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  devise :omniauthable, omniauth_providers: %i[google_oauth2]
  include DeviseTokenAuth::Concerns::User

  has_many :letters, dependent: :destroy

  def self.find_or_create_by_oauth(auth)
    transaction do
      user = find_by(uid: auth.uid)
      if user.nil?
        newName = auth.info.name
        if newName.length > 10
          newName = newName[0..9]
        end
        user = User.new(uid: auth.uid, provider: auth.provider, name: newName)
        user.save
      end
      user
    end
  end

  def get_short_uuid
    Rails.logger.debug("uuid: #{uuid}")
    Base64.urlsafe_encode64([uuid.delete('-')].pack("H*")).tr('=', '')
  end

  def self.find_by_shot_uuid(shot_uuid)
    uuid = Base64.urlsafe_decode64(shot_uuid + '=' * (4 - shot_uuid.length % 4)).unpack("H*")[0]
    find_by(uuid: uuid.scan(/.{8}|.+/).join('-'))
  end
end
