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

  # describe 'Update User' do
  #   describe 'as a standard user' do
  #     it 'should allow the user to update their information', :vcr do
  #       user = create(:user)
  #       sign_in_as(user)
  #       patch :update, params: { id: user.id, user: { role: 1 } }
  #       expect(json[:given_name]).to eq "Barry"
  #     end
  #   end
  # end

  describe 'Current User' do
    describe 'when logged in' do
      it 'should return the current user', :vcr do
        user = create(:user)
        sign_in_as(user)
        get :current, params: { id: user.id }
        expect(response).to have_http_status(:ok)
      end
    end
    describe 'when not logged in', :vcr do
      it 'should error' do
        user = create(:user)
        get :current, params: { id: user.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

end
