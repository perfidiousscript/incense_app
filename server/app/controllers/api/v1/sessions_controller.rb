class Api::V1::SessionsController < Clearance::BaseController
  include HandlesExceptions

  skip_before_action :verify_authenticity_token
  skip_before_action :require_login, only: [:create, :destroy, :current], raise: false

  before_action :set_raven_context
  rescue_from ::Exception do |exception|
    exception_handler(exception)
  end

  def create
    @user = authenticate(params)
    sign_in(@user) do |status|
      if status.success?
        render json: @user, status: :created
      else
        raise Errors::Unauthorized.new(status.failure_message)
      end
    end
  end

  def destroy
    sign_out
    head :no_content
  end

  private

  def set_raven_context
    # Sentry.user_context(id: current_user.id, email: current_user.email) if current_user
    # Sentry.set_context(params: params.to_unsafe_h, url: request.url)
  end
end
