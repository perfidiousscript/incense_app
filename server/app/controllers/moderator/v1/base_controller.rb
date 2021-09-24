class Moderator::V1::BaseController < ApiController
  before_action :require_login
  before_action :require_moderator!

  def require_moderator!
    raise Errors::Forbidden.new unless current_user.admin? || current_user.moderator?
  end
end
