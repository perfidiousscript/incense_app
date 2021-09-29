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

  describe 'update review vote' do
    it 'should update an existing review vote' do
      user = create(:user)
      review = create(:review)
      review_vote = create(:review_vote, user: user, review: review)

      sign_in_as user

      patch :update, params: {
        id: review_vote.id,
        review_vote: {
          vote_type: 'down'
        }
      }

      expect(response).to have_http_status :ok
      expect(json['vote_type']).to eq('down')
    end

    it 'should not allow updating another users review vote' do
      user = create(:user)
      user_2 = create(:user)
      review = create(:review)
      review_vote = create(:review_vote, user: user, review: review)

      sign_in_as user_2

      patch :update, params: {
        id: review_vote.id,
        review_vote: {
          vote_type: 'down'
        }
      }

      expect(response).to have_http_status :forbidden
    end
  end

end
