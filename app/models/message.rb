class Message < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates :body, length: { maximum: 255 }

  def self.project(projectId)
    where(project_id: projectId)
  end
end