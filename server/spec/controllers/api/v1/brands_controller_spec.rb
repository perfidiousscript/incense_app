require 'rails_helper'

RSpec.describe Api::V1::BrandsController, type: :controller do
  brand_params_list = %i(name description country)

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'Create new brand' do
    describe 'as a basic user' do
      it 'should create an unapproved brand with valid params' do
        user = create(:user)
        sign_in_as user
        post :create, params: {
          brand:{
          name: 'shoyeido',
          description: 'great japanese incense brand',
          country: 'Japan',
        }}

        assert_response :created
        expect(Brand.count).to eq 1
        expect(Brand.first.name).to eq 'shoyeido'
        expect(Brand.first.approved?).to eq false
      end
    end
    describe 'as a moderator' do
    end
    describe 'as an admin' do
    end
  end
end
