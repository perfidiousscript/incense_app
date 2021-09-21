require 'rails_helper'

RSpec.describe Api::V1::BrandsController, type: :controller do
  brand_params_list = %i(name description country image_url)

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
          image_url: brand.image_url
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
          image_url: brand.image_url
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
          image_url: brand.image_url
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
          image_url: brand.image_url
        }}

        assert_response :created
        expect(Brand.count).to eq 1
        expect(Brand.first.approved?).to eq true
      end
    end
  end

  describe 'Approve Brand' do
    it 'should allow a moderator to approve a brand ' do
      brand = create(:brand)
      moderator = create(:user, :moderator)

      expect(Brand.first.approved?).to eq false

      sign_in_as moderator

      patch :approve, params: {
        brand_id: brand.id
      }

      assert_response :ok
      expect(Brand.first.approved?).to eq true
    end
    it 'should not allow a non-moderator to approve a brand ' do
      brand = create(:brand)
      user = create(:user, :user)

      expect(Brand.first.approved?).to eq false

      sign_in_as user

      patch :approve, params: {
        brand_id: brand.id
      }

      assert_response :forbidden
      expect(Brand.first.approved?).to eq false
    end
  end
end