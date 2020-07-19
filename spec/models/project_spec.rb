require "rails_helper"

RSpec.describe Project, :type => :model do
  describe "Associations" do

  end

  
  subject {
    described_class.new(name: 'Test',
                       description: 'This is a test description',
                       body: 'This is a test body')
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

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
end