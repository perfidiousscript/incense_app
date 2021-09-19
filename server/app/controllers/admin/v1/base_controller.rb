class Admin::V1::BaseController < ApiController
  before_action :require_login
  before_action :require_admin!

  def require_admin!
    raise Errors::Forbidden.new unless current_user.admin?
  end
end
