class CreateProjectTags < ActiveRecord::Migration[6.0]
  def change
    create_table :project_tags do |t|
      t.references :project, foreign_key: true
      t.references :tag, foreign_key: true
    end
  end
end
