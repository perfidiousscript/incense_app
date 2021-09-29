class ReviewRanking::Calculate
  include Command

  def initialize(review)
    @review = review
  end

  def call
    up_votes = ReviewVote.where(review_id: @review.id, vote_type: 'up').count
    down_votes = ReviewVote.where(review_id: @review.id, vote_type: 'down').count
    ranking = up_votes - down_votes
    magnitude = up_votes + down_votes

    @review.review_ranking.update(ups: up_votes, downs: down_votes, ranking: ranking, magnitude: magnitude)
  end
end
