class Api::V1::PostsController < Api::V1::BasesController
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    posts = Post.includes(:user, :genres, :tags, :letters).all
    render json: posts.map(&:as_custom_index_json), status: :ok
  end

  def show; end
end
