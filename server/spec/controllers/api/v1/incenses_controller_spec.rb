require 'rails_helper'

RSpec.describe Api::V1::IncensesController, type: :controller do
  incense_params_list = %i(name,brand,description)

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'Create New Incense' do
    describe 'as a basic user' do
      it 'should create an unapproved incense' do
        user = create(:user)
        brand = create(:brand, :approved)
        incense = build(:incense)

        sign_in_as user
        post :create, params: {
          incense: {
            name: incense.name,
            description: incense.description,
            brand_id: brand.id
          }
        }

        assert_response :created
        expect(Incense.count).to eq 1
        expect(Incense.first.approved?).to eq false
      end

      it 'should create with ingredients' do
        user = create(:user)
        brand = create(:brand, :approved)
        ingredient_1 = create(:ingredient)
        ingredient_2 = create(:ingredient, name: 'myrrh')
        incense = build(:incense)

        sign_in_as user
        post :create, params: {
          incense: {
            name: incense.name,
            description: incense.description,
            brand_id: brand.id,
            ingredient_ids: [ingredient_1.id, ingredient_2.id].to_json
          }
        }

        assert_response :created
        expect(Incense.first.ingredients.count).to eq 2
      end

      it 'should error with bad ingredient' do
        user = create(:user)
        brand = create(:brand, :approved)
        ingredient_1 = create(:ingredient)
        incense = build(:incense)


        sign_in_as user

        post :create, params: {
          incense: {
            name: incense.name,
            description: incense.description,
            brand_id: brand.id,
            ingredient_ids: [ingredient_1.id, 'deadbeef'].to_json
          }
        }

        assert_response :unprocessable_entity
      end

      it 'should error with no brand' do
        user = create(:user)
        incense = build(:incense)

        sign_in_as user
        post :create, params: {
          incense: {
            name: incense.name,
            description: incense.description,
          }
        }

        assert_response :unprocessable_entity
        expect(Incense.count).to eq 0
      end

      it 'should error if incense already exists' do
        user = create(:user)
        brand = create(:brand, :approved)
        incense = create(:incense)

        expect(Incense.count).to eq 1

        sign_in_as user
        post :create, params: {
          incense: {
            name: incense.name,
            description: incense.description,
            brand_id: brand.id
          }
        }

        assert_response :unprocessable_entity
        expect(Incense.count).to eq 1
        expect(Incense.first.approved?).to eq false
      end
    end

    describe 'as a moderator' do
      it 'should create an approved incense'do
        user = create(:user, :moderator)
        brand = create(:brand, :approved)
        incense = build(:incense)

        sign_in_as user
        post :create, params: {
          incense: {
            name: incense.name,
            description: incense.description,
            brand_id: brand.id
          }
        }

        assert_response :created
        expect(Incense.count).to eq 1
        expect(Incense.first.approved?).to eq true
      end
    end
  end

  describe '#Approval' do
    describe 'as a user without permissions' do
      it 'should not allow approval' do
        user = create(:user)
        incense = create(:incense)

        expect(Incense.first.approved?).to eq false

        sign_in_as user

        patch :approve, params: {
          incense_slug: incense.slug
        }

        assert_response :forbidden
        expect(Incense.first.approved?).to eq false
      end
    end

    describe 'as a moderator' do
      it 'should allow approval' do
        moderator = create(:user, :moderator)
        incense = create(:incense)

        expect(Incense.first.approved?).to eq false

        sign_in_as moderator

        patch :approve, params: {
          incense_slug: incense.slug
        }

        assert_response :ok
        expect(Incense.first.approved?).to eq true
      end
    end
  end

  describe '#Show' do
    describe 'as a user not logged in' do
      it 'should show an approved incense' do
        incense = create(:incense, :approved)
        ingredient = create(:ingredient)
        create(:ingredient_classification, incense: incense, ingredient: ingredient)

        get :show, params: {
          slug: incense.slug
        }

        assert_response :ok
        expect(json[:id]).to eq(incense[:id])
        expect(json[:ingredients][0][:id]).to eq(ingredient[:id])
      end

      it 'should return incense reviews with their rankings' do
          incense = create(:incense, :approved)
          ingredient = create(:ingredient)
          create(:ingredient_classification, incense: incense, ingredient: ingredient)
          review = create(:review, :with_ranking, incense: incense)
          create(:review_vote, review: review)

          get :show, params: {
            slug: incense.slug
          }

          assert_response :ok
          expect(json[:reviews].length).to eq(1)
          expect(json[:reviews][0][:review_ranking][:downs]).to eq(0)
      end

      it 'should not return an unapproved incense' do
        incense = create(:incense)

        get :show, params: {
          slug: incense.slug
        }

        assert_response :not_found
      end
    end

    describe 'as a logged in basic user' do
      it 'should return an approved incense' do
        user = create(:user)
        incense = create(:incense, :approved)

        sign_in_as user

        get :show, params: {
          slug: incense.slug
        }

        assert_response :ok
      end

      it 'should not return an unapproved incense' do
        user = create(:user)
        incense = create(:incense)

        sign_in_as user

        get :show, params: {
          slug: incense.slug
        }

        assert_response :not_found
      end
    end

    describe 'as a logged in moderator user' do
      it 'should return an approved incense' do
        user = create(:user, :moderator)
        incense = create(:incense, :approved)

        sign_in_as user

        get :show, params: {
          slug: incense.slug
        }

        assert_response :ok
      end

      it 'should return an unapproved incense' do
        user = create(:user, :moderator)
        incense = create(:incense)

        sign_in_as user

        get :show, params: {
          slug: incense.slug
        }

        assert_response :ok
      end
    end
  end

  describe '#index' do
    describe 'without being logged in'do
      it 'returns all approved incenses' do
        incense_1 = create(:incense, :approved)
        incense_2 = create(:incense, :approved)
        incense_3 = create(:incense)

        get :index

        expect(json.length).to eq(2)
      end

      it 'returns incenses which are associated with a brand' do
        brand_1 = create(:brand)
        brand_2 = create(:brand)

        incense_1 = create(:incense, :approved, brand: brand_1)
        incense_2 = create(:incense, :approved, brand: brand_2)

        get :index, params: {
          brand: brand_1.slug
        }

        expect(json.length).to eq(1)
        expect(json[0]['id']).to eq(incense_1['id'])
      end

      it 'returns incenses which come from a given country' do
        brand_1 = create(:brand, country: 'Japan')
        brand_2 = create(:brand, country: 'India')
        brand_3 = create(:brand, country: 'Japan')

        incense_1 = create(:incense, :approved, brand: brand_1)
        incense_2 = create(:incense, :approved, brand: brand_2)
        incense_3 = create(:incense, :approved, brand: brand_3)

        get :index, params: {
          country: 'Japan'
        }

        expect(json.length).to eq(2)
        expect(json.map{|s|s['id']}).to include(incense_1.id)
        expect(json.map{|s|s['id']}).to include(incense_3.id)
      end

      it 'only returns incenses with a searched ingredient' do
        ingredient = create(:ingredient)
        incense_1 = create(:incense, :approved)
        incense_2 = create(:incense, :approved)
        incense_3 = create(:incense, :approved)

        create(:ingredient_classification, incense: incense_1, ingredient: ingredient)
        create(:ingredient_classification, incense: incense_2, ingredient: ingredient)

        get :index, params: {
          includes_ingredients: ingredient.id
        }

        expect(json.length).to eq(2)
        expect(json.map{|s|s['id']}).to include(incense_1.id)
        expect(json.map{|s|s['id']}).to include(incense_2.id)
      end

      it 'only includes incenses without an excluded ingredient' do
        ingredient_1 = create(:ingredient)
        ingredient_2 = create(:ingredient, name: 'myrrh')
        incense_1 = create(:incense, :approved)
        incense_2 = create(:incense, :approved)
        incense_3 = create(:incense, :approved)

        create(:ingredient_classification, incense: incense_1, ingredient: ingredient_1)
        create(:ingredient_classification, incense: incense_2, ingredient: ingredient_1)
        create(:ingredient_classification, incense: incense_3, ingredient: ingredient_2)

        get :index, params: {
          excludes_ingredients: ingredient_1.id
        }

        expect(json.length).to eq(1)
        expect(json[0]['id']).to eq(incense_3.id)
      end

      it 'has no problem paginating incenses without an excluded ingredient' do
        ingredient_1 = create(:ingredient)
        ingredient_2 = create(:ingredient, name: 'myrrh')

        26.times do
          incense = create(:incense, :approved)
          create(:ingredient_classification, incense: incense, ingredient: ingredient_1)
        end

        2.times do
          incense = create(:incense, :approved)
          create(:ingredient_classification, incense: incense, ingredient: ingredient_1)
          create(:ingredient_classification, incense: incense, ingredient: ingredient_2)
        end

        get :index, params: {
          excludes_ingredient: ingredient_2.id
        }

        expect(json.length).to eq(25)
      end

      it 'includes incense with included ingredient, excludes those with excluded ingredient' do
        ingredient_1 = create(:ingredient)
        ingredient_2 = create(:ingredient, name: 'myrrh')
        incense_1 = create(:incense, :approved)
        incense_2 = create(:incense, :approved)
        incense_3 = create(:incense, :approved)

        create(:ingredient_classification, incense: incense_1, ingredient: ingredient_1)

        create(:ingredient_classification, incense: incense_2, ingredient: ingredient_1)
        create(:ingredient_classification, incense: incense_2, ingredient: ingredient_2)

        create(:ingredient_classification, incense: incense_3, ingredient: ingredient_2)

        get :index, params: {
          includes_ingredients: ingredient_1.id,
          excludes_ingredients: ingredient_2.id
        }

        expect(json.length).to eq(1)
        expect(json[0]['id']).to eq(incense_1.id)
      end

      it 'searches in multiple fields' do
        brand_1 = create(:brand, country: 'Japan')
        brand_2 = create(:brand, country: 'India')
        ingredient_1 = create(:ingredient)
        ingredient_2 = create(:ingredient, name: 'myrrh')
        incense_1 = create(:incense, :approved, brand: brand_1)
        incense_2 = create(:incense, :approved, brand: brand_1)
        incense_3 = create(:incense, :approved, brand: brand_2)

        create(:ingredient_classification, incense: incense_1, ingredient: ingredient_1)

        create(:ingredient_classification, incense: incense_2, ingredient: ingredient_1)
        create(:ingredient_classification, incense: incense_2, ingredient: ingredient_2)

        create(:ingredient_classification, incense: incense_3, ingredient: ingredient_1)

        get :index, params: {
          includes_ingredients: ingredient_1.id,
          excludes_ingredients: ingredient_2.id,
          country: 'Japan'
        }

        expect(json.length).to eq(1)
        expect(json[0]['id']).to eq(incense_1.id)
      end

    end
  end
end
