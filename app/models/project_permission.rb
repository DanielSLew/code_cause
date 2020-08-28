class ProjectPermission < ApplicationRecord
  ROLES = ['Creator', 'Contributor']
  
  belongs_to :project
  belongs_to :user
  
  validates_uniqueness_of :project, scope: [:user_id]
  validates :role, inclusion: { in: ROLES }

  def self.find_users(project_id, role=nil)
    find(User, 'project', project_id, role)
  end

  def self.find_projects(user_id, role=nil)
    find(Project, 'user', user_id, role)
  end

  def self.add(project_id, role, user_id)
    self.create(project_id: project_id,
                user_id:    user_id,
                role:       role)
  end

  def self.remove(project_id, user_id)
    permission = self.find_by project_id: project_id, user_id: user_id
    permission.destroy
  end

  private

  def self.find(model, id_type, id, role)
    search_term = { "project_permissions.#{id_type}_id" => id }
    search_term["project_permissions.role"] = role if role

    model.left_outer_joins(:project_permissions).where(search_term)
  end
end