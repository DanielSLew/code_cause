class CreateProjectPermissions < ActiveRecord::Migration[6.0]
  def change
    create_table :project_permissions do |t|
      t.references :user, foreign_key: true
      t.references :project, foreign_key: true

      t.string :role

      t.timestamps
    end
  end
end
