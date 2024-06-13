class Api::V1::GenresController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[show]
  
  def show
    genres = Post.includes(:genres).find_by(uuid: params[:id]).genres.map(&:name)

    render json: genres, status: :ok
  end
end
