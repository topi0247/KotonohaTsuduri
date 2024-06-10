class CreatePostGenres < ActiveRecord::Migration[7.1]
  def change
    create_table :post_genres do |t|
      t.references :post, :null => false
      t.references :genre, :null => false
    end
  end
end
