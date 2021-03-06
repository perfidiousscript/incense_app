require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'sign up' do
    it 'does not allow user without confirmed email to sign in' do
      user = create(:user, :unconfirmed)
      post '/api/v1/sessions', params: {session: {email: user.email, password: user.password}}
      expect(response).to have_http_status(:unauthorized)
      expect(json).to eq({error:{type:"authentication_error",detail:"please confirm your email",status:"unauthorized"}}.as_json)
    end

    it 'can confirm email address' do
      user = create(:user, :unconfirmed)
      patch '/api/v1/users/confirm_email', params: {email_confirmation_token: user.email_confirmation_token}
      expect(response).to have_http_status(:ok)
      expect(User.find(user.id).email_confirmed_at).to_not eq(nil)
    end

    it 'sends error on bad token' do
      patch '/api/v1/users/confirm_email', params: {email_confirmation_token: 'fake_stuff'}
      expect(response).to have_http_status(:not_found)
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
