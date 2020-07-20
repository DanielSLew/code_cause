class Api::V1::SessionsController < ApplicationController
  def create
    user = User.where(email: params[:email]).first

    if user && user.authenticate(params[:password])
      save_session(user)
      render json: { success: "You have successfully logged in." }
    else
      render json: { error: "There is something wrong with your login credentials." }
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { success: "You have successfully logged out." }
  end
end