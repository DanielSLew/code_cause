class ProjectPermission < ApplicationRecord
  ROLES = ['Creator', 'Contributor']
  
  belongs_to :project
  belongs_to :user
  
  validates_uniqueness_of :project, scope: [:user_id]
  validates :role, inclusion: { in: ROLES }

  def self.find_users(projectId, role=nil)
    search_term = { "project_permissions.project_id" => projectId }
    search_term["project_permissions.role"] = role if role

    User.left_outer_joins(:project_permissions).where(search_term)
  end

  def self.add(projectId, role, userId)
    self.create(project_id: projectId,
                user_id:    userId,
                role:       role)
  end
end