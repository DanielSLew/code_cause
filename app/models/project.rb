class Project < ApplicationRecord
  has_many :project_permissions
  has_many :users, through: :project_permissions

  has_many :project_tags
  has_many :tags, through: :project_tags

  has_many :votes
  has_many :messages

  validates :name, length: { minimum: 3 }
  validates :description, length: { minimum: 10 }
  validates :body, presence: true

  def creators
    ProjectPermission.find_users(self.id, 'Creator')
  end

  def contributors
    ProjectPermission.find_users(self.id, 'Contributor')
  end

  def add_creator(user)
    ProjectPermission.add(self.id, 'Creator', user.id)
  end

  def add_contributor(user)
    ProjectPermission.add(self.id, 'Contributor', user.id)   
  end
end