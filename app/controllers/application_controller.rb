class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # def current_user
  #   @current_user ||= User.find(session[:user_id]) if session[:user_id]
  # end

  # def logged_in?
  #   !!current_user
  # end

  # def require_user
  #   if !logged_in?
  #     render json: { alert: "Must be logged in to do that." }
  #   end
  # end

  # def same_user(user)
  #   if current_user != user
  #     render json: { alert: "You are not authorized to do that." }
  #   end
  # end

  private

  def save_session(user)
    session[:used_id] = user.id
  end
end
