Clearance.configure do |config|
  config.mailer_sender = "noreply@incense_app"
  config.rotate_csrf_on_sign_in = false
  config.routes = false
  config.secure_cookie = true
  config.sign_in_guards = [ConfirmedUserGuard]
end
