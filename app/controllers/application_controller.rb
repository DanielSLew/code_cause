require 'jwt'
require 'byebug'
class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  # before_action :require_login

  def logged_in?
    !!session_user
  end

  def require_login
    render json: {alert: 'Please Login'}, status: :unauthorized unless logged_in?
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, secret_key, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        []
      end
    end
  end

  def session_user
    decoded_hash = decoded_token
    if !decoded_hash.empty?
      user_id = decoded_hash[0]['user_id']
      @user = User.find(user_id)
    else
      nil
    end
  end

  def encode_token(payload)
    JWT.encode(payload, secret_key)
  end

  private

  def secret_key
    Rails.application.credentials.secret_key
  end
end
