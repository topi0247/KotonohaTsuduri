class Api::V1::UsersController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index show]
  def index
    users = User.includes(:letters).where.not(letters: { id: nil }).order(updated_at: :desc)
    page = params[:page].present? ? params[:page].to_i : 1
    render json: {users: users.per_page(page).map(&:as_custom_index_json), all_count: users.count }, status: :ok
  end

  def show
    posts = User.includes(letters: :post).find_by(uuid: params[:id]).posts

    tab_posts = []
    case params[:tab]
    when 'first'
      posts.map do |post|
        tab_posts << post if post.letters.first.user.uuid == params[:id]
      end
    when 'reply'
      posts.map do |post|
        tab_posts << post if post.letters.first.user.uuid != params[:id]
      end
    else
      tab_posts = posts
    end
    render json: { posts: tab_posts.map(&:as_custom_index_json), all_count: tab_posts.count }, status: :ok
  end

  def show_user
    user = User.find_by(uuid: params[:id])
    render json: user.name, status: :ok
  end

  def update
    user = current_api_v1_user
    if user.update(user_params)
      head :ok
    else
      head :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
