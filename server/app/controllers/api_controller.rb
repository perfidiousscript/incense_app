class ApiController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::Flash
  include Clearance::Controller
  include HandlesExceptions

  before_action :set_raven_context

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

  def set_raven_context
    # Sentry.user_context(id: current_user.id, email: current_user.email) if current_user
    # Sentry.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
