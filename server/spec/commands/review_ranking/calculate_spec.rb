require 'rails_helper'

RSpec.describe ReviewRanking::Calculate do
  describe 'performs' do
    it 'works' do
      review = create(:review)
      review_ranking = create(:review_ranking, review: review)
      3.times {create(:review_vote, review: review)}
      2.times {create(:review_vote, :down, review: review)}

      calculation = ReviewRanking::Calculate.call(review)

      expect(calculation.success?).to be (true)
      expect(review_ranking['ups']).to eq(3)
      expect(review_ranking['downs']).to eq(2)
      expect(review_ranking['ranking']).to eq(1)
      expect(review_ranking['magnitude']).to eq(5)
    end
  end
end
