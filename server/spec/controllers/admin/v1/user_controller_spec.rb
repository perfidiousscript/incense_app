require 'rails_helper'

RSpec.describe Admin::V1::UsersController, type: :controller do
  # The list of attributes returned by user serializer
  user_params_list = %i(id username email role)

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'Show User' do

    # describe 'as unauthenticated' do
    #   it 'should not allow unauthenticated' do
    #     user = create(:user)
    #     get :show, params: { id: user.id }
    #     assert_response :unauthorized
    #   end
    # end

    # describe 'as a regular user' do
    #   it 'should not allow non-admin' do
    #     user = create(:user)
    #     sign_in_as(user)
    #     get :show, params: { id: user.id }
    #     assert_response :forbidden
    #   end
    # end

    # describe 'as an admin' do
    #   it 'should allow an admin to show any user' do
    #     admin_user = create(:user, :admin)
    #     user = create(:user)
    #     sign_in_as(admin_user)
    #     get :show, params: { id: user.id }
    #     assert_response :ok
    #     expect(json[:id]).to eq user.id
    #   end
    # end

  end

  describe 'Update User' do

    describe 'as a standard user' do
      it 'should not allow' do
        user = create(:user)
        sign_in_as(user)
        patch :update, params: { id: user.id, username: "Barry" }
        assert_response :forbidden
      end
    end

    describe 'as admin' do
      it 'should update their information' do
        admin = create(:user, :admin)
        user = create(:user)
        sign_in_as(admin)
        patch :update, params: {id: user.id, username: "Barry" }
        expect(json[:username]).to eq "Barry"
      end
    end

  end

  describe 'Index Users' do
    describe 'regular user' do
      it 'should not allow index' do
        user = create(:user)
        sign_in_as(user)
        get :index
        assert_response :forbidden
      end
    end

    describe 'admin user' do
      it 'should return all users' do
        admin_user = create(:user, :admin)
        user = create(:user)
        sign_in_as(admin_user)
        get :index
        expect(json.length).to eq 2
      end
    end
  end

  describe 'Destroy User' do
    # Holding off on this until practitioner model is in
  end
end
