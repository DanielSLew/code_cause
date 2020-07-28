class Tag < ApplicationRecord
  CATEGORIES = ['cause', 'skill', 'type']

  has_many :project_tags
  has_many :projects, through: :project_tags

  validates :name, presence: true
  validates :category, inclusion: { in: CATEGORIES }
end