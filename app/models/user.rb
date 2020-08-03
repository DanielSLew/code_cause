class User < ApplicationRecord
  has_secure_password

  has_many :project_permissions
  has_many :projects, through: :project_permissions
  
  has_many :votes
  has_many :messages

  validates :name, length: {minimum: 4}, uniqueness: true
  validates :email, uniqueness: true, 
             format: { with: /\A.+@.+\..+/, message: 'address is invalid.' }
  validates :password, length: {minimum: 8}, confirmation: true

  def created
    ProjectPermission.find_projects(self.id, 'Creator')
  end

  def contributing
    ProjectPermission.find_projects(self.id, 'Contributor')
  end
end