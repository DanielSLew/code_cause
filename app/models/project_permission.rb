class ProjectPermission < ApplicationRecord
  ROLES = ['Creator', 'Contributor']
  
  belongs_to :project
  belongs_to :user
  
  validates_uniqueness_of :project, scope: [:user_id]
  validates :role, inclusion: { in: ROLES }

  def self.find_users(projectId, role=nil)
    find(User, 'project', projectId, role)
  end

  def self.find_projects(userId, role=nil)
    find(Project, 'user', userId, role)
  end

  def self.add(projectId, role, userId)
    self.create(project_id: projectId,
                user_id:    userId,
                role:       role)
  end

  private

  def self.find(model, id_type, id, role)
    search_term = { "project_permissions.#{id_type}_id" => id }
    search_term["project_permissions.role"] = role if role

    model.left_outer_joins(:project_permissions).where(search_term)
  end
end