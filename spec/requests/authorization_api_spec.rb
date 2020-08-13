require 'byebug'
require 'rails_helper'
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

describe "authorization api", type: :request do
  let!(:users) { create_projects_users_tags_votes }

  context "login" do
    describe "valid credentials" do
      before do
        post "/api/#{version}/login", params: user_params(1)
      end

      it { expect(response).to have_http_status(:success) }

      it "returns a user object" do
        user = JSON.parse(response.body)['user']
        expect(user['email']).to be_truthy
        expect(user['created'].first['body']).to be_truthy
        expect(user['contributing'].first['body']).to be_truthy
      end

      it "returns a jwt token" do
        expect(JSON.parse(response.body)['jwt'].length).to be > 10
      end
    end

    describe "invalid credentials" do
      before do
        post "/api/#{version}/login", params: { name: 'nouser', password: 'nopassword' }
      end

      it { expect(response).to have_http_status(:unauthorized) }

      it "returns an error object" do
        expect(JSON.parse(response.body)['error']).to match('Invalid credentials')
      end
    end
  end

  context "auto_login" do
    describe "valid token" do
      before do
        post "/api/#{version}/login", params: user_params(1)
        token = JSON.parse(response.body)['jwt']
        headers = { "AUTHORIZATION" => "Bearer #{token}" }
        get "/api/#{version}/auto_login", headers: headers
      end

      it { expect(response).to have_http_status(:success) }

      it "returns a user object" do
        user = JSON.parse(response.body)
        expect(user['email']).to be_truthy
        expect(user['created'].first['body']).to be_truthy
        expect(user['contributing'].first['body']).to be_truthy
      end

      it "does not return the jwt token" do
        expect(JSON.parse(response.body)['jwt']).to be_falsey
      end
    end

    describe "invalid token" do
      before do
        headers = { "AUTHORIZATION" => "Bearer 412esfSDGsge1"}
        get "/api/#{version}/auto_login", headers: headers
      end

      it { expect(response).to have_http_status(:not_found) }

      it "returns an alert object" do
        expect(JSON.parse(response.body)['alert']).to match('No user logged in')        
      end
    end
  end
end
