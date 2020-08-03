require "rails_helper"
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

RSpec.describe User, :type => :model do
  describe "Associations" do
    it { should have_many :projects }
    it { should have_many :messages }
    it { should have_many :votes }
  end

  
  subject(:user1_min_bio) {
    described_class.new(user_params(1))
  }

  subject(:user1_full_bio) {
    described_class.new(user_params_full(1))
  }

  describe "validations" do
    it { should validate_uniqueness_of :name }
    it { should validate_uniqueness_of :email }

    it "is valid with valid attributes" do
      expect(user1_min_bio).to be_valid
    end

    it "is valid with a full bio" do
      expect(user1_full_bio).to be_valid
    end

    it "is not valid with a name less than 4 characters long" do
      user1_min_bio.name = 'Tes'
      expect(user1_min_bio).to_not be_valid
    end

    it "is not valid with a password less than 7 characters long" do
      user1_min_bio.password = 'testpas'
      expect(user1_min_bio).to_not be_valid
    end

    it "is not valid without an email" do
      user1_min_bio.email = nil
      expect(user1_min_bio).to_not be_valid
    end

    it "cannot add the same user twice" do
      user1_min_bio.save
      expect(User.count).to eq 1

      user1_full_bio.save
      expect(User.count).to eq 1
    end
  end

  describe '#created' do
    it "returns projects that have the user as a creator" do
      project1 = Project.create!(project_params(1))
      project2 = Project.create!(project_params(2))
      user = User.create!(user_params(1))

      project1.add_creator(user)
      project2.add_creator(user)

      expect(user.created).to match_array [project1, project2]
    end
  end

  describe '#contributing' do
    it "returns projects that have the user as a contributor" do
      project1 = Project.create!(project_params(1))
      project2 = Project.create!(project_params(2))
      user = User.create!(user_params(1))

      project1.add_contributor(user)
      project2.add_contributor(user)

      expect(user.contributing).to match_array [project1, project2]
    end
  end
end