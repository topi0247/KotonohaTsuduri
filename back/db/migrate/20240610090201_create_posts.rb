class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :uuid, :null => false, :default => "UUID()"
      t.timestamps
    end
    add_index :posts, :uuid, :unique => true
  end
end
