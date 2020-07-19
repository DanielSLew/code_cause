class Project < ApplicationRecord
  has_many :project_permissions
  has_many :users, through: :project_permissions
  has_many :votes

  validates :name, length: { minimum: 3 }
  validates :description, length: { minimum: 10 }
  validates :body, presence: true

  def creators
    ProjectPermissions.find_users(self.id, 'Creator')
  end

  def contributors
    ProjectPermissions.find_users(self.id, 'Contributor')
  end

  def add_creator(user)
    ProjectPermissions.add(self.id, 'Creator', user.id)
  end

  def add_contributor(user)
    ProjectPermissions.add(self.id, 'Contributor', user.id)   
  end
end