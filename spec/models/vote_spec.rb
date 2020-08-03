require 'rails_helper'
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

RSpec.describe Vote, type: :model do
  describe "Associations" do
    it { should belong_to(:project) }
    it { should belong_to(:user) }
  end

  describe "Validations" do
    it "can create a vote with valid project and user" do
      user = User.create!(user_params(1))
      project = Project.create!(project_params(1))
      project.votes.create(user_id: user.id)

      expect(project.votes.size).to eq 1
      expect(Vote.count).to eq 1
    end

    it "won't let a user vote twice on a project" do
      user = User.create!(user_params(1))
      project = Project.create!(project_params(1))
      
      project.votes.create(user_id: user.id)
      project.votes.create(user_id: user.id)

      expect(Vote.count).to eq 1
    end

    it "will let different users votes on the same project" do
      user1 = User.create!(user_params(1))
      user2 = User.create!(user_params(2))
      project = Project.create!(project_params(1))
      
      project.votes.create(user_id: user1.id)
      project.votes.create(user_id: user2.id)

      expect(Vote.count).to eq 2
    end
  end
end