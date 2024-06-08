# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  devise :omniauthable, omniauth_providers: %i[google_oauth2]
  include DeviseTokenAuth::Concerns::User
end
