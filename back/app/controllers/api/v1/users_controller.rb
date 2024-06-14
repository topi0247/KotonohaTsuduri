class Api::V1::UsersController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index show]
  def index
    users = User.all
    render json: users.map(&:as_custom_index_json), status: :ok
  end

  def show
    posts = User.includes(letters: :user).find_by(uuid: params[:id]).posts
    render json: { posts: posts.map(&:as_custom_index_json), all_count: posts.count }, status: :ok
  end

  def update
    user = current_api_v1_user
    if user.update(user_params)
      head :success
    else
      head :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
