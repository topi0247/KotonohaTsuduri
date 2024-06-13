class Api::V1::LettersController < Api::V1::BasesController

  def create
    Letter.transaction do
      letter = current_api_v1_user.letters.new(name: letter_params[:name], sentences: letter_params[:sentences])
      post =  Post.find_by_uuid_or_create(params[:id])
      if post.nil?
        render json: { success: false, message: "前の手紙が見つかりません" }, status: :not_found and return
      end

      # ジャンルの登録
      post.create_genres!(letter_params[:genres])
      # タグの登録
      post.create_tags!(letter_params[:tags])

      letter.post = post

      if letter.save
      render json: { success: true, message: "投函しました" }, status: :created
      else
      render json: { success: false, message: "投函できませんした" }, status: :internal_server_error
      raise ActiveRecord::Rollback
      end
    end
  end

  private

  def letter_params
    params.require(:letter).permit(:name, :sentences, genres: [], tags: [])
  end
end
