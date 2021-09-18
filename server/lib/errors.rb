module Errors
  def self.report(message, exception, extras = {})
    Raven.extra_context(extras) { Raven.capture_exception(message, exception) }
  end

  class Base < StandardError; end

  class Validation < Errors::Base
    include ActiveModel::Validations

    def initialize(resource_name, validated = nil)
      errors.merge!(validated.errors) if validated.present?
      @validated = validated
      @resource_name = resource_name
    end

    def detail
      "This #{@resource_name} could not be processed."
    end

    def status
      :unprocessable_entity
    end

    def as_json
      {
        error: {
          type: 'invalid_request_error',
          detail: detail,
          status: status,
          params: errors.to_hash
        }
      }
    end
  end

  class UnprocessableEntity < Errors::Base
    def initialize(message = nil)
      @message = message
    end

    def detail
      @message || 'Unprocessable Entity'
    end

    def status
      :unprocessable_entity
    end

    def as_json
      {
        error: {
          type: 'invalid_request_error',
          detail: detail,
          status: status,
        }
      }
    end
  end

  class NotFound < Errors::Base
    def initialize(resource_name)
      @resource_name = resource_name
    end

    def detail
      "This #{@resource_name} could not be found."
    end

    def status
      :not_found
    end

    def as_json
      {
        error: {
          type: 'invalid_request_error',
          detail: detail,
          status: status
        }
      }
    end
  end

  class Unauthorized < Errors::Base
    def initialize(message = nil)
      @message = message
    end

    def detail
      @message || 'Unauthorized'
    end

    def status
      :unauthorized
    end

    def as_json
      {
        error: {
          type: 'authentication_error',
          detail: detail,
          status: status
        }
      }
    end
  end

  class Forbidden < Errors::Base
    def initialize(message = nil)
      @message = message
    end

    def detail
      @message || 'Forbidden'
    end

    def status
      :forbidden
    end

    def as_json
      {
        error: {
          type: 'invalid_request_error',
          detail: detail,
          status: status
        }
      }
    end
  end

  class Unexpected < Errors::Base
    def initialize(message, exception, extras = {})
      @message = message
      @exception = exception
      Errors.report(@message, @exception, extras)
    end

    def detail
      'An unexpected error occurred. Our tech team has been notified!'
    end

    def status
      :internal_server_error
    end

    def as_json
      {
        error: {
          type: 'server_error',
          detail: detail,
          status: status
        }
      }
    end
  end
end
