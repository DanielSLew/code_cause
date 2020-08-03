require 'byebug'
require 'rails_helper'
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

SAMPLE_USER_COUNT = 10

describe "users api", type: :request do
  context "index" do
    let!(:users) { create_users(SAMPLE_USER_COUNT) }

    describe "get all users" do
      before do
        get "/api/#{version}/users"
      end

      it "returns status code success" do
        expect(response).to have_http_status(:success)
      end

      it "returns all users" do
        expect(User.count).to eq SAMPLE_USER_COUNT
      end
    end
  end

  context "show" do
    let!(:users) { create_users(SAMPLE_USER_COUNT) }

    describe "existing user" do
      before do
        get "/api/#{version}/users/1"
      end

      it "returns status code success" do
        expect(response).to have_http_status(:success)
      end

      it "returns a user object" do
        expect(JSON.parse(response.body)['email']).to be_truthy
      end
    end

    describe "non-existent user" do
      before do
        get "/api/#{version}/users/1000"
      end

      it "returns status code error" do
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  context "create" do
    describe "valid params" do
      before do
        post "/api/#{version}/users", params: user_params(1)
      end

      it "returns status code success" do
        expect(response).to have_http_status(:created)
      end

      it "adds user to database" do
        expect(User.count).to eq 1
      end

      it "returns a user object" do
        user = JSON.parse(response.body)

        expect(user['id']).to eq 1
        expect(user['email']).to be_truthy
        expect(user['name']).to be_truthy
        expect(user['password']).not_to be_truthy
      end
    end

    describe "invalid params" do
      before do
        post "/api/#{version}/users", params: {}
      end

      it "returns status code error" do
        expect(response).to have_http_status(:bad_request)
      end

      it "does not add user to database" do
        expect(User.count).to eq 0
      end

      it "returns an error object" do
        expect(JSON.parse(response.body)['email']).to eq ["address is invalid."]
      end
    end
  end

  context "update" do
    new_email = 'newemail@email.com'
    let!(:user) { User.create(user_params(1)) }

    describe "valid params" do
      before do
        put "/api/#{version}/users/1",
            params: { email: new_email, password: user_params(1)[:password] }
      end

      it "returns status code success" do
        expect(response).to have_http_status(:success)
      end

      it "returns updated user" do
        expect(JSON.parse(response.body)['email']).to eq new_email
      end
    end

    describe "invalid params" do
      before do
        put "/api/#{version}/users/1", params: { email: 'email' }
      end

      it "returns status code error" do
        expect(response).to have_http_status(:bad_request)
      end

      it "returns an error object" do
        expect(JSON.parse(response.body)['email']).to eq ["address is invalid."]
      end
    end

    describe "non-existent user" do
      it "returns status code error" do
        put "/api/#{version}/users/1000", params: { email: new_email }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  context "destroy" do
    let!(:user) { User.create(user_params(1)) }   
    
    describe "existent user" do
      before do
        delete "/api/#{version}/users/1"
      end

      it "returns a status code success" do
        expect(response).to have_http_status(:success)
      end

      it "returns a success message" do
        expect(JSON.parse(response.body)['message']).to be_truthy
      end

      it "removes user from database" do
        expect(User.count).to eq 0
      end
    end

    describe "non-existent user" do
      before do
        delete "/api/#{version}/users/1000"
      end

      it "returns a status code error" do
        expect(response).to have_http_status(:not_found)
      end

      it "does not remove user from database" do
        expect(User.count).to eq 1
      end
    end
  end
end
