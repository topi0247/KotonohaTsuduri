class Api::V1::Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  # オーバーライド
  def redirect_callbacks
    user = User.find_or_create_by_oauth(request.env['omniauth.auth'])
    if user.persisted?
      sign_in(:user, user)
      # トークンを生成
      client_id = SecureRandom.urlsafe_base64(nil, false)
      token     = SecureRandom.urlsafe_base64(nil, false)
      token_hash = BCrypt::Password.create(token)
      expiry    = (Time.now + DeviseTokenAuth.token_lifespan).to_i

      user.tokens[client_id] = {
        token:  token_hash,
        expiry: expiry
      }
      user.save

      redirect_to "#{ENV['FRONT_URL']}/auth/callback?status=success&uid=#{user.uid}&token=#{token}&client=#{client_id}&expiry=#{expiry}", allow_other_host: true
    else
      redirect_to "#{ENV['FRONT_URL']}/auth/callback?status=failure", allow_other_host: true
    end
  end
end
