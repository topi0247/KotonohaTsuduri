class Api::V1::PostsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index show]

  def index
    posts = Post.includes(:genres, :tags, letters: :user).order(created_at: :desc)
    page = params[:page].present? ? params[:page].to_i : 1
    posts_paginated = posts.per_page(page)
    render json: { posts: posts_paginated.map(&:as_custom_index_json), all_count: Post.all.count }, status: :ok
  end

  def show
    post = Post.includes(:genres, :tags, letters: :user).find_by(uuid: params[:id])
    page = params[:page].present? ? params[:page].to_i : 1
    letter = page <= post.letters.count ? post.letters.per_page(page).first : nil
    if letter.nil?
      render json: { letter: nil, all_count: post.letters.count }, status: :ok
    else
      render json: { letter: letter.as_custom_json, all_count: post.letters.count }, status: :ok
    end
  end
end
