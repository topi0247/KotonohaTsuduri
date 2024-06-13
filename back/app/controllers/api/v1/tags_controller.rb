class Api::V1::TagsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index]

  def index
    tags = Post.includes(:tags).find_by(uuid: params[:post_uuid]).tags.map(&:name)
    render json: tags, status: :ok
  end
end
