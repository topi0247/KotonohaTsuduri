class Api::V1::Auth::TokenValidationsController < DeviseTokenAuth::OmniauthCallbacksController
  protected

  def render_validate_token_success
    render json: {
      success: true,
      user: {
        id: @resource.id,
        name: @resource.name,
      }
    }
  end
end
