class AddColumnTags < ActiveRecord::Migration[6.0]
  def change
    add_column :tags, :category, :string
  end
end
