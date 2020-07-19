class ProjectPermission < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates_uniqueness_of :project, scope: [:user_id]

  def self.find_users(projectId, role)
    searchTerm = { "project_permissions.project_id" => projectId }
    searchTerm["project_permissions.role"] = role if role

    User.left_outer_joins(:project_permissions).where(searchTerm)
  end

  def self.add(projectId, role, userId)
    self.create(project_id: projectId,
                user_id:    userId,
                role:       role)
  end
end