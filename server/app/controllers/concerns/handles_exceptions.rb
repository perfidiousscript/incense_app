module HandlesExceptions
  extend ActiveSupport::Concern

  def exception_handler(exception)
    case exception
    when Errors::Base
      render json: exception.as_json, status: exception.status
    when ActionController::ParameterMissing
      error = Errors::Validation.new('resource')
      error.errors.add(exception.param.to_sym, "can't be blank")
      exception_handler(error)
    when CanCan::AccessDenied
      exception_handler(Errors::Forbidden.new)
    else
      # raise the original exception for dev & testing
      raise exception unless Rails.env.production?

      exception_handler(Errors::Unexpected.new('Unhandled Exception', exception))
    end
  end
end
