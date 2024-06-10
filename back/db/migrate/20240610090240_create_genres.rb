class CreateGenres < ActiveRecord::Migration[7.1]
  def change
    create_table :genres do |t|
      t.string :name, :null => false, :limit => 10
      t.timestamps
    end
    add_index :genres, :name, :unique => true
  end
end
