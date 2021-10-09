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
        brand_id: brand.slug
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
        brand_id: brand.slug
      }

      assert_response :forbidden
      expect(Brand.first.approved?).to eq false
    end
  end

  describe 'show brand' do
    describe 'without credentials'do
      it 'should return an approved brand' do
        brand = create(:brand, :approved)

        get :show, params: {
          id: brand.slug
        }

        assert_response :ok
      end
      it 'should not return an unapproved brand' do
        brand = create(:brand)
        get :show, params: {
          id: brand.slug
        }

        assert_response :not_found
      end
    end

    describe 'logged in as regular user' do
      it 'should return an approved brand' do
        user = create(:user)
        brand = create(:brand, :approved)

        sign_in_as user

        get :show, params: {
          id: brand.slug
        }

        assert_response :ok
      end
      it 'should not return an unapproved brand' do
        user = create(:user)
        brand = create(:brand)

        sign_in_as user

        get :show, params: {
          id: brand.slug
        }

        assert_response :not_found
      end
    end
    describe 'logged in as moderator' do
      it 'should return an approved brand' do
        user = create(:user, :moderator)
        brand = create(:brand, :approved)

        sign_in_as user

        get :show, params: {
          id: brand.slug
        }

        assert_response :ok
      end
      it 'should return an unapproved brand' do
        user = create(:user, :moderator)
        brand = create(:brand)

        sign_in_as user

        get :show, params: {
          id: brand.slug
        }

        assert_response :ok
      end
    end
  end

  describe 'index brands' do
    it 'should return approved brands' do
      brand_1 = create(:brand, :approved)
      brand_2 = create(:brand)

      get :index

      expect(json.length).to eq(1)
      expect(json[0]['id']).to eq(brand_1.id)
    end

    it 'should return brands from a given country' do
      brand_1 = create(:brand, :approved, country: 'Japan')
      brand_2 = create(:brand, :approved, country: 'China')

      get :index, params: {
        country: 'Japan'
      }

      expect(json.length).to eq(1)
      expect(json[0]['id']).to eq(brand_1.id)
    end

    it 'should search on name' do
      brand_1 = create(:brand, :approved, name: 'Dinglesnort')
      brand_2 = create(:brand, :approved, name: 'Dinglesnerp')
      brand_3 = create(:brand, :approved, name: 'Danglesnerp')
      brand_4 = create(:brand, :approved, name: 'Snerpalerp')

      get :index, params: {
        name: 'D'
      }

      expect(json.length).to eq(3)

      get :index, params: {
        name: 'Dingle'
      }

      expect(json.length).to eq(2)

      get :index, params: {
        name: 'Dinglesnort'
      }

      expect(json.length).to eq(1)
    end
  end
end
