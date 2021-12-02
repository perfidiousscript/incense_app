class UserMailer < ApplicationMailer
  default from: ENV['EMAIL_DOMAIN'] || "incense-hermitage-no-reply@incense-hermitage.com"

  def registration_confirmation(user)
    @user = user
    @url = "#{ENV['HOST_URL']}/email_confirmation/#{user.email_confirmation_token}"
    mail(to: @user.email, subject: 'Incense Hermitage: Please Confirm your email address')
  end
end
