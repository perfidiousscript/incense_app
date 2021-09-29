class ReviewRanking::Calculate
  include Command

  def initialize(review)
    @review = review
  end

  def call
    up_votes = ReviewVote.where(review_id: @review.id, vote_type: 'up').count
    down_votes = ReviewVote.where(review_id: @review.id, vote_type: 'down').count

    @review.review_ranking.update(ups: up_votes, downs: down_votes)
  end
end
