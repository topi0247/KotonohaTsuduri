class CreateLetters < ActiveRecord::Migration[7.1]
  def change
    create_table :letters do |t|
      t.string :uuid, :null => false, :default => "UUID()"
      t.text :sentences, :null => false, :limit => 100000
      t.string :name, :null => false, :limit => 10
      t.references :post, :null => false, :default => 0
      t.references :user, :null => false, :default => 0
      t.timestamps
    end
    add_index :letters, :uuid, :unique => true
  end
end
