if Rails.env.production?
  Raven.configure do |config|
    config.dsn = Config.env[:sentry][:dsn]
    config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  end
end
