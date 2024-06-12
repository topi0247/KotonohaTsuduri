class Api::V1::LettersController < Api::V1::BasesController
  def create
    user = current_api_v1_user

    letter = user.letters.create!(sentences: letter_params[:sentences])
    post = Post.find_or_create_by_short_uuid(letter_params[:post_id])
    if post.nil?
      render json: { success: false }, status: :not_found and return
    end

    letter.post = post

    if letter.save
      render json: { success: true, post_id: post.id }, status: :created
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  private

  def letter_params
    params.require(:letter).permit(:post_id, :sentences, [:ganres], [:tags])
  end
end
