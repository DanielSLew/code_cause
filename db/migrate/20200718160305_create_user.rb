class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.text :gravatar_url
      t.text :bio
      t.text :social
      t.string :organization

      t.timestamps
    end
  end
end
