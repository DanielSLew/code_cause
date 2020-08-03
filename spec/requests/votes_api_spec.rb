require 'byebug'
require 'rails_helper'
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

describe "users api", type: :request do
  let!(:project) { Project.create!(project_params(1)) }
  let!(:user) { User.create!(user_params(1)) }

  context "create" do
    describe "existing project valid params" do
      before do
        post "/api/#{version}/projects/1/votes", params: { user_id: user.id }
      end

      it { expect(response).to have_http_status(:created) }

      it "returns a vote object" do
        expect(JSON.parse(response.body)['user_id']).to eq user.id
      end
    end

    describe "existing project invalid params" do
      before do
        post "/api/#{version}/projects/1/votes", params: { user_id: 1000 }
      end

      it { expect(response).to have_http_status(:bad_request) }

      it "returns an error object" do
        expect(JSON.parse(response.body)['user']).to eq ["must exist"]
      end
    end

    describe "non-existent project" do
      before do
        post "/api/#{version}/projects/2/votes", params: { user_id: user.id }
      end

      it { expect(response).to have_http_status(:not_found) }
    end
  end

  context "destroy" do
    let!(:vote) { Vote.create(user_id: user.id, project_id: project.id) }

    describe "existing project valid params" do
      before do
        delete "/api/#{version}/projects/1/votes/1", params: { user_id: user.id }
      end

      it { expect(response).to have_http_status(:success) }

      it "returns a success message" do
        expect(JSON.parse(response.body)['success']).to be_truthy
      end

      it "removes the vote from the database" do
        expect(Vote.count).to eq 0
      end
    end

    describe "existing project invalid params" do
      before do
        delete "/api/#{version}/projects/1/votes/1", params: { user_id: 1000 }
      end

      it {expect(response).to have_http_status(:not_found) }

      it "returns an error object" do
        expect(JSON.parse(response.body)['alert']).to eq "Vote doesn't exist."
      end

      it "does not remove vote from the database" do
        expect(Vote.count).to eq 1
      end
    end

    describe "non-existent vote" do
      before do
        delete "/api/#{version}/projects/1/votes/2", params: { user_id: 1000 }
      end

      it { expect(response).to have_http_status(:not_found) }

      it "returns an error object" do
        expect(JSON.parse(response.body)['alert']).to eq "Vote doesn't exist."
      end

    end

    describe "non-existent project" do
      before do
        delete "/api/#{version}/projects/2/votes/2", params: { user_id: user.id }
      end

      it { expect(response).to have_http_status(:not_found) }
    end
  end
end
