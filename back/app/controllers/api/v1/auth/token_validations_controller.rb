class Api::V1::Auth::TokenValidationsController < DeviseTokenAuth::TokenValidationsController
  protected

  def render_validate_token_success
    render json: {
      success: true,
      user: {
        uuid: @resource.uuid,
        name: @resource.name,
      }
    }
  end
end
