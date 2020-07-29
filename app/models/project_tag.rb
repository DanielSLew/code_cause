class ProjectTag < ApplicationRecord
  belongs_to :project
  belongs_to :tag

  validates_uniqueness_of :project, scope: :tag_id
  validates_presence_of :tag_id, :project_id
end