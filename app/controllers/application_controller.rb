class ApplicationController < ActionController::Base
    include SessionsHelper
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  def logged_in_user
    unless logged_in?
      flash[:danger] = "Please log in."
      redirect_to root_url
    end
  end
  protect_from_forgery with: :exception


end
