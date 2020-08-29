class User < ApplicationRecord
  SECURE_DETAILS = :id, :name, :email, :bio, :social, :organization, :created_at
  
  has_secure_password
  before_save { self.email = email.downcase }

  has_many :project_permissions
  has_many :projects, through: :project_permissions
  
  has_many :votes
  has_many :messages

  validates :name, length: {minimum: 4}, uniqueness: true
  validates :email, uniqueness: { case_sensitive: false }, 
             format: { with: /\A.+@.+\..+/, message: 'address is invalid.' }
  validates :password, length: {minimum: 8}, confirmation: true

  def created
    ProjectPermission.find_projects(self.id, 'Creator')
  end

  def contributing
    ProjectPermission.find_projects(self.id, 'Contributor')
  end

  def self.find(id)
    select(User::SECURE_DETAILS).where({ id: id }).first
  end
end