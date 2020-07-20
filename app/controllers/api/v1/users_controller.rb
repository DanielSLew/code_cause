class Api::V1::UsersController < ApplicationController

  def create
    user = user.new(user_params)
    
    if user.save
      save_session(user)
      render json: user
    else
      render json: user.errors
    end
  end

  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: user
    else
      render json: user.errors
    end
  end

  def destroy
    @user.destroy
    render json: { message: 'Account Removed!' }
  end

  private

  def user_params
    params.permit(:name, :body, :description)
  end
end