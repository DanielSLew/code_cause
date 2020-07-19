require "rails_helper"

RSpec.describe User, :type => :model do
  describe "Associations" do
    it { should have_many :projects }
    # it { should have_many :messages }
    # it { should have_many :votes }

  end

  
  subject {
    described_class.new(name: 'Test',
                        email: 'test@test.com',
                        password: 'testpass')
  }

  subject_full_bio {
    described_class.new(name: 'Test',
                        email: 'test@test.com',
                        password: 'testpass',
                        bio: "Hi, I'm a test case",
                        socials: 'These are my socials',
                        organization: 'Test Inc.')
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is valid with a full bio" do
    expect(subject_full_bio).to be_valid
  end

  it "is not valid with a name less than 4 characters long" do
    subject.name = 'Tes'
    expect(subject).to_not be_valid
  end

  it "is not valid with a password less than 7 characters long" do
    subject.password = 'testpas'
    expect(subject).to_not be_valid
  end

  it "is not valid without an email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end
end