class Api::V1::PostsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index show]

  def index
    posts = Post.includes(:genres, :tags, letters: :user).order(created_at: :desc)
    posts_paginated = posts.per_page(search_params[:page])
    render json: posts_paginated.map(&:as_custom_index_json), status: :ok
  end

  def show; end

  private

  def search_params
    params.permit(:page)
  end
end
