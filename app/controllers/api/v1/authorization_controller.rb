require 'byebug'
class Api::V1::AuthorizationController < ApplicationController
  def login
    @user = User.find_by(name: params[:name])
    if @user && @user.authenticate(params[:password])
      payload = {user_id: @user.id}
      token = encode_token(payload)
      render json: {user: user_with_projects, jwt: token}
    else
      render json: {error: 'Invalid credentials'}, status: :unauthorized
    end
  end

  def auto_login
    @user = session_user
    if @user
      render json: user_with_projects
    else
      render json: {alert: 'No user logged in'}, status: :unauthorized
    end
  end

  private

  def user_with_projects
    { **@user.as_json,
      created: @user.created,
      contributing: @user.contributing }
  end
end