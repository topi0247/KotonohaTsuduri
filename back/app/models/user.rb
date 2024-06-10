# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  devise :omniauthable, omniauth_providers: %i[google_oauth2]
  include DeviseTokenAuth::Concerns::User

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
end
