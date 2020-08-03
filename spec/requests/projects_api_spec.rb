require 'byebug'
require 'rails_helper'
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

SAMPLE_PROJECT_NUM = 10

describe "projects api", type: :request do
  let!(:projects) { create_projects_users_tags_votes(SAMPLE_PROJECT_NUM) }

  # projects#index
  describe "get all projects" do
    before do
      get "/api/#{version}/projects"
    end

    it "returns all projects" do
      expect(JSON.parse(response.body).size).to eq SAMPLE_PROJECT_NUM
      expect(JSON.parse(response.body)).to be_an_instance_of Array
    end

    it "returns status code 200" do
      expect(response).to have_http_status(:success)
    end

    it "returns tags and votes in project object" do
      project = JSON.parse(response.body).first
      expect(project['tags'].first['category']).to be_an_instance_of String
      expect(project['votes'].size).to be > 0
    end
  end

  # projects#show
  context "get one project" do
    describe "existing project" do
      before do
        get "/api/#{version}/projects/1"
      end

      it "returns one project" do
        expect(JSON.parse(response.body)['id']).to eq 1
        expect(JSON.parse(response.body)).to be_an_instance_of Hash
      end

      it "returns status code 200" do
        expect(response).to have_http_status(:success)
      end

      it "returns tags, votes, creators, contributors" do
        project = JSON.parse(response.body)
        expect(project['tags'].size).to be > 0
        expect(project['votes'].size).to be > 0
        expect(project['creators'].first['email']).to be_truthy
        expect(project['contributors'].first['email']).to be_truthy
      end
    end

    describe "non-existing project" do
      it "returns status not found" do
        get "/api/#{version}/projects/1000"
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  # projects#create
  context "create" do 
    describe "valid project" do
      before do
        post "/api/#{version}/projects", params: project_params(SAMPLE_PROJECT_NUM + 1)
      end

      it "returns a created status" do
        expect(response).to have_http_status(:created)
      end

      it "creates a project" do
        expect(Project.count).to eq SAMPLE_PROJECT_NUM + 1
      end

      it 'returns a project object' do
        expect(JSON.parse(response.body)['description']).to be_truthy
        expect(JSON.parse(response.body)['id']).to be_truthy
      end
    end

    describe "invalid project" do
      before do
        post "/api/#{version}/projects", params: {}
      end

      it "returns an error status" do
        expect(response).to have_http_status(:bad_request)
      end

      it "does not create a project" do
        expect(Project.count).to eq SAMPLE_PROJECT_NUM
      end

      it 'returns a list of errors object' do
        expect(JSON.parse(response.body)['body'].first).to eq "can't be blank"
      end
    end
  end

  # projects#update
  context "update" do   
    describe "existing project with valid params" do
      before do
        put "/api/#{version}/projects/1", params: { body: 'this is an updated body' }
      end

      it "returns an success status" do
        expect(response).to have_http_status(:success)
      end

      it "returns the updated project" do
        expect(JSON.parse(response.body)['body']).to eq 'this is an updated body'
        expect(JSON.parse(response.body)['id']).to eq 1
      end
    end

    describe "existing project with invalid params" do
      before do
        put "/api/#{version}/projects/1", params: { body: '' }
      end

      it "returns an error status" do
        expect(response).to have_http_status(:bad_request)
      end

      it "does not update the project" do
        expect(Project.find(1).body).not_to eq ''
      end

      it 'returns a list of errors object' do
        expect(JSON.parse(response.body)['body'].first).to eq "can't be blank"
      end
    end

    describe "non-existing project" do
      it "returns status not found" do
        put "/api/#{version}/projects/1000"
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  # projects#destroy
  context "destroy" do    
    describe "existing project" do
      before do
        delete "/api/#{version}/projects/1"
      end

      it "returns an success status" do
        expect(response).to have_http_status(:success)
      end

      it "removes project from database" do
        expect(Project.count).to eq SAMPLE_PROJECT_NUM - 1
      end

      it "returns success message" do
        expect(JSON.parse(response.body)['message']).to be_truthy
      end
    end

    describe "non-existing project" do
      it "returns status not found" do
        delete "/api/#{version}/projects/1000"
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end