require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  # The list of attributes returned by user serializer
  user_params_list = %i(id username email role)

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'Create New User' do
    it 'should create a user when valid', :vcr do
      user = build(:user)
      post :create, params: {
        user: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      }
      expect(response).to have_http_status(:created)
    end

    it 'should error when a user is invalid', :vcr do
      user = build(:user)
      post :create, params: {
        user: {
          email: user.email,
          password: user.password
        }
      }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
