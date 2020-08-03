require 'byebug'
require 'rails_helper'
require './spec/support/helpers'

RSpec.configure do |c|
  c.include Helpers
end

describe "tags api", type: :request do

  context "create" do
    describe "valid params" do
      before do
        post "/api/#{version}/tags", params: { name: 'Logo', category: 'skill' }
      end

      it { expect(response).to have_http_status(:created) }

      it "saves to database" do
        expect(Tag.count).to eq 1
      end

      it "returns the new tag" do
        tag = JSON.parse(response.body)

        expect(tag['name']).to eq 'Logo'
        expect(tag['category']).to eq 'skill'
        expect(tag['id']).to eq 1
      end
    end

    describe "invalid params" do
      before do
        post "/api/#{version}/tags", params: { name: '', category: 'skillz' }
      end

      it { expect(response).to have_http_status(:bad_request) }

      it "returns error object" do
        expect(JSON.parse(response.body)['category']).to eq ["is not included in the list"]
      end
    end
  end
end