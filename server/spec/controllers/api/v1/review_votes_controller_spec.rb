require 'rails_helper'

RSpec.describe Api::V1::ReviewVotesController, type: :controller do

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'create new review vote' do
    it 'should create a new vote' do
      user = create(:user)
      review = create(:review)

      sign_in_as user

      post :create, params: {
        review_vote: {
          review_id: review.id,
          vote_type: 'up'
        }
      }

      expect(response).to have_http_status :created
    end

    it 'should not create vote on voted review' do
      user = create(:user)
      review = create(:review)
      create(:review_vote, user: user, review: review)

      sign_in_as user

      post :create, params: {
        review_vote: {
          review_id: review.id,
          vote_type: 'down'
        }
      }

      expect(response).to have_http_status :unprocessable_entity
      expect(json["error"]["detail"]).to eq('cannot create two review votes for the same review; update existing vote instead')
    end
  end
end
