require 'rails_helper'

RSpec.describe Api::V1::IngredientsController, type: :controller do

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'create new ingredient' do
    describe 'as a moderator' do
      it 'should create an ingredient' do
        user = create(:user, :moderator)
        sign_in_as user

        post :create, params: {
          ingredient:{
            name: 'frankincense',
            description: 'cool resin',
          }
        }

        expect(response).to have_http_status(:created)
        expect(Ingredient.count).to be(1)
      end
    end

    describe 'as a basic user' do
      it 'should return status forbidden' do
        user = create(:user)
        sign_in_as user

        post :create, params: {
          ingredient:{
            name: 'frankincense',
            description: 'cool resin',
          }
        }

        expect(response).to have_http_status(:forbidden)
        expect(Ingredient.count).to be(0)
      end
    end
  end

  describe 'update ingredient' do
    describe 'as a moderator' do
      it 'should update the ingredient'do
      user = create(:user, :moderator)
      ingredient = create(:ingredient)
      sign_in_as user

      patch :update, params: {
        slug: ingredient.slug,
        ingredient:{
          description: 'www.an-even-cooler-photo.com'
        }
      }

      expect(response).to have_http_status(:ok)
      expect(Ingredient.first.description).to eq('www.an-even-cooler-photo.com')
      end
    end

    describe 'as a basic user' do
      it 'should return forbidden'do
      user = create(:user)
      ingredient = create(:ingredient)
      sign_in_as user

      patch :update, params: {
        slug: ingredient.slug,
        ingredient:{
          description: 'www.an-even-cooler-photo.com'
        }
      }

      expect(response).to have_http_status(:forbidden)
      expect(Ingredient.first.description).to eq("a resin from the middle east")
      end
    end
  end

  describe 'show ingredient' do
    describe 'without being logged in' do
      it 'should return an ingredient by id' do
        ingredient = create(:ingredient)
        create(:ingredient, name: 'myrrh')

        get :show, params: {
          slug: ingredient.slug
        }

        expect(json['id']).to eq(ingredient.id)
      end
    end
  end

  describe 'index ingredients' do
    describe 'without being logged in' do
    end
  end
end
