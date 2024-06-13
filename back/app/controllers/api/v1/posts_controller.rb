class Api::V1::PostsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index show]

  def index
    posts = Post.includes(:genres, :tags, letters: :user).order(created_at: :desc)
    page = params[:page].present? ? params[:page].to_i : 1
    posts_paginated = posts.per_page(page)
    render json: { posts: posts_paginated.map(&:as_custom_index_json), all_count: Post.all.count }, status: :ok
  end

  def show; end
end
