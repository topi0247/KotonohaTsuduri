class CreatePostLetters < ActiveRecord::Migration[7.1]
  def change
    create_table :post_letters do |t|
      t.references :post, :null => false
      t.references :letter, :null => false
    end
  end
end
