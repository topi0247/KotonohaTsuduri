class Api::V1::TagsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[show]

  def show
    tags = Post.includes(:tags).find_by(uuid: params[:id]).tags.map(&:name)
    render json: tags, status: :ok
  end
end
