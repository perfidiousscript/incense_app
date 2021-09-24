require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do

  review_params_list = %i|price_paid rating review_body burn_time year_purchased sweet smokey woody ethereal savory fruity herbal spicy citrus floral|

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  fdescribe 'create new review' do
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
        }
      }

      assert_response :unprocessable_entity
      expect(Review.count).to eq 0
    end
  end

end
