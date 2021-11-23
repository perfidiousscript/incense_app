Clearance.configure do |config|
  config.mailer_sender = "noreply@incense_app"
  config.rotate_csrf_on_sign_in = false
  config.routes = false
  config.cookie_domain = ENV["COOKIE_DOMAIN"]
end
