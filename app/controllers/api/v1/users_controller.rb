class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # def index
  #   render json: User.all
  # end

  def show
    if !@user
      render json: {}, status: :not_found
    else
      render json: {
        **@user.as_json,
        created: @user.created,
        contributing: @user.contributing
      }
    end
  end

  def create
    user = User.new(user_params)
    
    if user.save
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: {user: user, jwt: token}, status: :created
    else
      render json: user.errors, status: :bad_request
    end
  end

  def update
    if !@user
      render json: {}, status: :not_found
    elsif @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :bad_request
    end
  end

  def destroy
    if !@user
      render json: {}, status: :not_found
    else
      @user.destroy
      render json: { message: 'Account Removed!' }
    end
  end

  private

  def set_user
    begin
      @user = User.find(params[:id])
    rescue
      @user = nil
    end
  end

  def user_params
    params.permit(:name, :email, :password, :gravatar_url, :bio, :social, :organization)
  end
end