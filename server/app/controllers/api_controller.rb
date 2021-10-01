class ApiController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::Flash
  include Clearance::Controller
  include ActionController::Cookies
  include HandlesExceptions

  before_action :set_sentry_context

  rescue_from ::Exception do |exception|
    exception_handler(exception)
  end

  # Override Clearance require_login method for more
  # explicit error message
  def require_login
    unless signed_in?
      raise Errors::Unauthorized.new('Must be signed in.')
    end
  end

  private

  def set_sentry_context
    # Sentry.user_context(id: current_user.id, email: current_user.email) if current_user
    # Sentry.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
