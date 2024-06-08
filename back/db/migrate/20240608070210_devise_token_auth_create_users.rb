class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table(:users) do |t|
      ## Required
      t.string :provider, :null => false, :default => "google_oauth2"
      t.string :uid, :null => false, :default => ""

      ## uuid
      t.string :uuid, :null => false, :default => "UUID()"

      ## User Info
      t.string :name, :null => false, :default => "", limit: 10

      ## Tokens
      t.text :tokens

      t.timestamps
    end

    add_index :users, [:uid, :provider],     unique: true
  end
end
