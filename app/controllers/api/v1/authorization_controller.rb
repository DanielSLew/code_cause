require 'byebug'
class Api::V1::AuthorizationController < ApplicationController
  def login
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: {user: user, jwt: token}
    else
      render json: {error: 'Invalid credentials'}, status: :bad_request
    end
  end

  def auto_login
    user = session_user
    if user
      render json: user
    else
      render json: {error: 'No user logged in'}
    end
  end
end