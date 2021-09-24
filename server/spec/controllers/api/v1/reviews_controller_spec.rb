require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do

  review_params_list = %i|price_paid rating review_body burn_time year_purchased sweet smokey woody ethereal savory fruity herbal spicy citrus floral|

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'create new review' do
    it 'should create a new incense with valid params' do
      user = create(:user)
      incense = create(:incense)
      review = build(:review, incense: incense)

      sign_in_as user

      post :create, params: {
        review: {
          incense_id: review.incense_id,
          price_paid: review.price_paid,
          rating: review.rating,
          review_body: review.review_body,
          burn_time: review.burn_time,
          year_purchased: review.year_purchased,
          sweet: review.sweet,
          smokey: review.smokey,
          woody: review.woody,
          ethereal: review.ethereal,
          savory: review.savory,
          fruity: review.fruity,
          citrus: review.citrus,
          herbal: review.herbal,
          spicy: review.spicy,
          floral: review.floral,
          earthy: review.earthy
        }
      }

      assert_response :created
      expect(Review.count).to eq 1
    end
    it 'should create a new incense with no optional params' do
      user = create(:user)
      incense = create(:incense)
      review = build(:review, incense: incense)

      sign_in_as user

      post :create, params: {
        review: {
          incense_id: review.incense_id,
          rating: review.rating,
        }
      }

      assert_response :created
      expect(Review.count).to eq 1
    end

    it 'should error with invalid params' do
      user = create(:user)
      incense = create(:incense)
      review = build(:review, incense: incense)

      sign_in_as user

      post :create, params: {
        review: {
          price_paid: review.price_paid,
          rating: review.rating,
          review_body: review.review_body,
          burn_time: review.burn_time,
          year_purchased: review.year_purchased,
          sweet: review.sweet,
          smokey: review.smokey,
          woody: review.woody,
          ethereal: review.ethereal,
          savory: review.savory,
          fruity: review.fruity,
          citrus: review.citrus,
          herbal: review.herbal,
          spicy: review.spicy,
          floral: review.floral,
          earthy: review.earthy
        }
      }

      assert_response :unprocessable_entity
      expect(Review.count).to eq 0
    end

    it 'disallows creating two reviews for same incense' do
      user = create(:user)
      incense = create(:incense)
      review = create(:review, user: user, incense: incense)

      sign_in_as user

      post :create, params: {
        incense_id: incense.id,
        review: {
          spicy: 3.0,
        }
      }


      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'disallows creating a review with value greater than 5' do
      user = create(:user)
      incense = create(:incense)
      review = build(:review, incense: incense)

      sign_in_as user

      expect{post :create, params: {
        review: {
          incense_id: review.incense_id,
          rating: 50,
        }
      }}.to raise_error(ArgumentError)

      expect(Review.count).to eq 0
    end
  end

  describe 'show' do
    it 'should show a review' do
      review = create(:review)

      get :show, params: {
        id: review.id
      }

      expect(response).to have_http_status(:ok)
      expect(json[:id]).to eq(review.id)
    end
  end

  describe 'update' do
    it 'should update a review' do
      user = create(:user)
      review = create(:review, user: user)
      new_review_body = 'Actually kind of like it better now.'

      sign_in_as user

      patch :update, params: {
        id: review.id,
        review: {
          spicy: 3,
          review_body: new_review_body
        }
      }

      expect(response).to have_http_status(:ok)
      expect(json[:spicy]).to be(3.0)
      expect(json[:review_body]).to eq(new_review_body)
    end

    it 'errors if incense_id is passed' do
      user = create(:user)
      review = create(:review, user: user)
      review_id = review.id

      sign_in_as user

      patch :update, params: {
        id: review.id,
        review: {
          incense_id: '001',
        }
      }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(review.id).to be(review_id)
    end

    it 'does not allow updating another users review' do
      user = create(:user)
      review = create(:review)

      sign_in_as user

      patch :update, params: {
        id: review.id,
        review: {
          spicy: 1,
        }
      }

      expect(response).to have_http_status(:forbidden)
    end
  end

end
