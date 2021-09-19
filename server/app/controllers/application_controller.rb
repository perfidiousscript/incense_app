class ApplicationController < ActionController::API
  include Clearance::Controller

  def authenticate_admin_user!
    redirect_to sign_in_path unless current_user && current_user.admin?
  end

  def current_admin_user
    current_user
  end

  def set_raven_context
    Raven.user_context(id: current_user.id, email: current_user.email) if current_user
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

end
