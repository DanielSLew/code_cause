class Project < ApplicationRecord
  validates :name, length: { minimum: 3 }
  validates :description, length: { minimum: 10 }
  validates :body, presence: true
end