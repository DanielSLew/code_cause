require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe "Associations" do
    it { should have_many(:projects) }
    it { should have_many(:project_tags) }
  end

  describe "Validations" do
    it { should validate_presence_of :name }
    it { should validate_inclusion_of(:category).in_array(['cause', 'skill', 'type']) }
  end
end