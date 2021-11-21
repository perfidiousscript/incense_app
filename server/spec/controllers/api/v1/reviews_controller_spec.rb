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
        incense_slug: incense.slug,
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

      assert_response :created
      expect(Review.count).to eq 1
    end
    it 'should create a new incense with no optional params' do
      user = create(:user)
      incense = create(:incense)
      review = build(:review, incense: incense)

      sign_in_as user

      post :create, params: {
        incense_slug: incense.slug,
        review: {
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

      expect{
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
      }.to raise_error(ActiveRecord::RecordNotFound)

      expect(Review.count).to eq 0
    end

    it 'disallows creating two reviews for same incense' do
      user = create(:user)
      incense = create(:incense)
      review = create(:review, user: user, incense: incense)

      sign_in_as user

      post :create, params: {
        incense_slug: incense.slug,
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
        incense_slug: incense.slug,
        review: {
          rating: 50,
        }
      }}.to raise_error(ArgumentError)

      expect(Review.count).to eq 0
    end

    it 'should create a review ranking' do
      user = create(:user)
      incense = create(:incense)
      review = build(:review, incense: incense)

      sign_in_as user

      post :create, params: {
        incense_slug: incense.slug,
        review: {
          rating: review.rating,
        }
      }

      ranking = ReviewRanking.first

      expect(ReviewRanking.count).to eq 1
      expect(ranking.review_id).to eq(Review.first.id)
      expect(ranking.ups).to eq(0)
      expect(ranking.downs).to eq(0)
      expect(ranking.ranking).to eq(0)
      expect(ranking.magnitude).to eq(0)
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

    it 'errors if incense_slug is passed' do
      user = create(:user)
      review = create(:review, user: user)
      review_id = review.id

      sign_in_as user

      patch :update, params: {
        id: review.id,
        incense_slug: 'a-slug',
        review: {
        }
      }

      expect(response).to have_http_status(:unprocessable_entity)
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

  describe 'runs IncenseStatistics after review change' do
    it 'runs after successful review creation' do
      user = create(:user, :moderator)
      incense = create(:incense, :approved)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 3)

      expect(IncenseStatistic.count).to eq(0)

      sign_in_as user

      post :create, params: {
        incense_slug: incense.slug,
        review: {
          sweet: 4.0,
        }
      }

      expect(response).to have_http_status(:created)
      expect(IncenseStatistic.count).to eq(1)
      expect(IncenseStatistic.first[:sweet_avg]).to eq(3.33)
    end

    it 'does not run after invalid review creation' do
      user = create(:user, :moderator)
      incense = create(:incense, :approved)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 3)

      expect(IncenseStatistic.count).to eq(0)

      sign_in_as user

      expect{post :create, params: {
        review: {
          sweet: 4.0,
        }
      }}.to raise_error(ActiveRecord::RecordNotFound)

      expect(IncenseStatistic.count).to eq(0)
    end

    it 'runs after successful review update' do
      user = create(:user, :moderator)
      incense = create(:incense, :approved)
      create(:review, incense: incense, sweet: 3)
      review = create(:review, incense: incense, user: user, sweet: 3)

      expect(IncenseStatistic.count).to eq(0)

      sign_in_as user

      patch :update, params: {
        id: review.id,
        review: {
          sweet: 4.0,
        }
      }

      expect(response).to have_http_status(:ok)
      expect(IncenseStatistic.count).to eq(1)
      expect(IncenseStatistic.first[:sweet_avg]).to eq(3.5)
    end
  end

end
