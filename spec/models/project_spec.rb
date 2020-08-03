require "rails_helper"
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

RSpec.describe Project, :type => :model do

  describe "Associations" do
    it { should have_many(:users) }
    it { should have_many(:votes) }
    it { should have_many(:messages) }
    it { should have_many(:tags) }
  end

  subject { Project.create(project_params(1)) }

  describe "validations" do
    it { expect(subject).to be_valid }

    it "is not valid with a name less than 3 characters long" do
      subject.name = 'Tes'
      expect(subject).to be_valid

      subject.name = 'Te'
      expect(subject).to_not be_valid
    end

    it "is not valid with a description less than 10 characters long" do
      subject.description = '0123456789'
      expect(subject).to be_valid

      subject.description = '123456789'
      expect(subject).to_not be_valid
    end

    it "is not valid without a body" do
      subject.body = nil
      expect(subject).to_not be_valid
    end

    it "is saved to the database" do
      subject.save
      expect(Project.count).to eq 1
    end
  end

  describe "tag association" do
    let(:skill_tag) { Tag.create(name: 'CSS', category: 'skill') }
    let(:type_tag) { Tag.create(name: 'Blog', category: 'type') }
    let(:cause_tag) { Tag.create(name: 'Research', category: 'cause') }
    let(:project2) { Project.create(project_params(2)) }
    it { expect(subject.tags.size).to eq 0 }

    context "add" do
      before do
        subject.tags << skill_tag
      end

      it "can have a single tag" do
        expect(subject.tags.size).to eq 1
      end

      it "raises error if tag already exists on project" do
        expect { subject.tags << skill_tag }.to raise_error(ActiveRecord::RecordInvalid)
      end

      it "can have multiple tags" do
        subject.tags << [type_tag, cause_tag]
        expect(subject.tags.size).to eq 3
      end

      it "can belong to multiple projects" do
        expect((project2.tags << skill_tag).size).to eq 1
      end
    end

    it "removes tag association but does not destroy tag" do
      subject.tags << skill_tag
      subject.tags.delete(skill_tag)

      expect(subject.tags.size).to eq 0
      expect(Tag.count).to eq 1
    end
  end

  context "permissions" do
    describe "#add_creator" do
      it "returns a new ProjectPermission instance" do
        project_permission = subject.add_creator(instance_double("User", id: 1))
        expect(project_permission).to be_an_instance_of ProjectPermission
      end

      it "adds a new ProjectPermission" do
        user1 = User.create!(user_params(1))
        subject.add_creator(user1)
        expect(ProjectPermission.count).to eq 1
        expect(ProjectPermission.first.user_id).to eq user1.id
        expect(ProjectPermission.first.project_id).to eq subject.id
      end

      it "cannot add the same user twice" do
        user1 = User.create!(user_params(1))
        subject.add_creator(user1)
        subject.add_creator(user1)
        expect(ProjectPermission.count).to eq 1
      end
    end

    describe "#remove_creator" do
      xit "remove a creator changes the return value of creators" do
        user1 = User.create!(user_params(1))
      end
    end

    describe "#creators" do
      it "adding a new creator changes the return value of creators" do
        user1 = User.create!(user_params(1))
        user2 = User.create!(user_params(2))
        subject.add_creator(user1)
        subject.add_creator(user2)
        expect(subject.creators).to match_array [user1, user2]
      end
    end

    describe "#add_contributor" do
      it "returns a new ProjectPermission instance" do
        user1 = User.create!(user_params(1))
        project_permission = subject.add_contributor(user1)
        expect(project_permission).to be_an_instance_of ProjectPermission
      end

      it "cannot add the same user twice" do
        user1 = User.create!(user_params(1))
        subject.add_contributor(user1)
        subject.add_contributor(user1)
        expect(ProjectPermission.count).to eq 1
      end
    end

    describe "#remove_contributor" do
      xit "remove a contributor changes the return value of contributors" do
        user1 = User.create!(user_params(1))

      end
    end

    describe "#contributors" do
      it "adding a new contributor changes the return value of contributors" do
        user1 = User.create!(user_params(1))
        subject.add_contributor(user1)
        expect(subject.contributors).to match_array [user1]
      end
    end

    it "cannot have a user with more than one role" do
      user1 = User.create!(user_params(1))
      subject.add_contributor(user1)
      subject.add_creator(user1)

      expect(ProjectPermission.count).to eq 1
      expect(ProjectPermission.first.role).to eq 'Contributor'
    end
  end

  describe "#votes" do
    it "returns an array of all project votes" do
      user1 = User.create!(user_params(1))
      Vote.create!(project_id: subject.id, user_id: user1.id)
      expect(subject.votes.size).to eq 1
    end
  end
end