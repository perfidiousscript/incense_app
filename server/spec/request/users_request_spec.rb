require 'rails_helper'

RSpec.describe 'Users', type: :request do
  fdescribe 'user sign up' do
    it 'requires email confirmation' do
      user = create(:user, :unconfirmed)
      post '/api/v1/sessions', params: {session: {email: user.email, password: user.password}}
      expect(response).to have_http_status(:forbidden)
      expect(json).to be({"error":{"type":"authentication_error","detail":"Please Confirm Email address.","status":"unauthorized"}})
    end

    it 'sends email on sign up' do
      email = "user@example.com"
      post '/api/v1/users', params: {user: { username: 'Rick Andmorty', email: email, password: "password" }}
      expect(last_email_confirmation_token).to be_present
      should_deliver_email(
        to: email,
        subject: "Incense Hermitage: Please Confirm your email address",
      )
    end
  end
end
