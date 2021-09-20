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
        brand = build(:brand)

        sign_in_as user
        post :create, params: {
          brand:{
          name: brand.name,
          description: brand.description,
          country: brand.country,
        }}

        assert_response :created
        expect(Brand.count).to eq 1
        expect(Brand.first.approved?).to eq false
      end

      it 'should error with bad country' do
        user = create(:user)
        sign_in_as user
        post :create, params: {
          brand:{
          name: 'shoyeido',
          description: 'great japanese incense brand',
          country: 'Chicago',
        }}

        assert_response :unprocessable_entity
        expect(Brand.count).to eq 0
      end

      it 'should error if brand already exists' do
        user = create(:user)
        brand = create(:brand)

        sign_in_as user

        post :create, params: {
          brand:{
          name: brand.name,
          description: 'great japanese incense brand',
          country: 'Chicago',
        }}

        assert_response :unprocessable_entity
        expect(Brand.count).to eq 1
        expect(Brand.first.approved?).to eq false
      end
    end

    describe 'as a moderator' do
      it 'should create an approved brand with valid params' do
        user = create(:user, :moderator)
        brand = build(:brand)

        sign_in_as user
        post :create, params: {
          brand:{
          name: brand.name,
          description: brand.description,
          country: brand.country,
        }}

        assert_response :created
        expect(Brand.count).to eq 1
        expect(Brand.first.approved?).to eq true
      end
    end
    describe 'as an admin' do
      it 'should create an approved brand with valid params' do
        user = create(:user, :admin)
        brand = build(:brand)

        sign_in_as user
        post :create, params: {
          brand:{
          name: brand.name,
          description: brand.description,
          country: brand.country,
        }}

        assert_response :created
        expect(Brand.count).to eq 1
        expect(Brand.first.approved?).to eq true
      end
    end
  end
end
