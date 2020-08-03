class Project < ApplicationRecord
  has_many :project_permissions
  has_many :users, through: :project_permissions, dependent: :destroy

  has_many :project_tags
  has_many :tags, through: :project_tags, dependent: :destroy

  has_many :votes, dependent: :destroy
  has_many :messages

  validates :name, length: { minimum: 3 }
  validates :description, length: { minimum: 10 }
  validates :body, presence: true

  # Returns projects w/ votes and tags as array of vote objects
  # TODO: See if possible to return only the vote count instead of array of objs
  def self.all_with_tags_votes
    Project.includes(:tags, :votes)
           .select('projects.*, COUNT(*) as tags, COUNT(*) as votes')
           .group('projects.id')
  end

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
