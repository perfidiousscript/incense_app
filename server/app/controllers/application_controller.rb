class ApplicationController < ActionController::API
  include Clearance::Controller

  def authenticate_admin_user!
    redirect_to sign_in_path unless current_user && current_user.admin?
  end

  def current_admin_user
    current_user
  end
  
end
