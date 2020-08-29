class Project < ApplicationRecord
  has_many :project_permissions
  has_many :users, through: :project_permissions, dependent: :destroy

  has_many :project_tags
  has_many :tags, through: :project_tags, dependent: :destroy

  has_many :votes, -> { select('votes.id, votes.project_id, votes.user_id') }, dependent: :destroy, class_name: "Vote", foreign_key: 'project_id'
  has_many :messages

  validates :name, length: { minimum: 3 }
  validates :description, length: { minimum: 10 }
  validates :body, presence: true

  def self.all_with_tags_votes
    projects = Project.includes(:tags, :votes)
           .select('projects.*, COUNT(*) as tags, COUNT(*) as votes')
           .group('projects.id').as_json

    # Map votes into an array of user_ids
    projects.each do |project|
      project["votes"].map! do |vote| 
        vote["user_id"]
      end
    end
  end

  def creator
    ProjectPermission.find_users(self.id, 'Creator').first
  end

  def contributors
    ProjectPermission.find_users(self.id, 'Contributor')
  end

  def set_creator(user)
    ProjectPermission.add(self.id, 'Creator', user.id)
  end

  def add_contributor(user)
    ProjectPermission.add(self.id, 'Contributor', user.id)   
  end

  def remove_contributor(user)
    ProjectPermission.remove(self.id, user.id)   
  end
end

