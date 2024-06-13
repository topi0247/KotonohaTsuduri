class Api::V1::GenresController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index]
  
  def index
    genres = Post.includes(:genres).find_by(uuid: params[:post_uuid]).genres.map(&:name)

    render json: genres, status: :ok
  end
end
