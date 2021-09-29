# == Schema Information
#
# Table name: review_votes
#
#  id         :uuid             not null, primary key
#  vote_type  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  review_id  :uuid             not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_review_votes_on_review_id  (review_id)
#  index_review_votes_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (review_id => reviews.id)
#  fk_rails_...  (user_id => users.id)
#
class ReviewVote < ApplicationRecord
  belongs_to :user
  belongs_to :review

  enum vote_type: [:down, :up]

  validates :review_id, :user_id, :vote_type, presence: true
  validates :vote_type, inclusion: { in: vote_types.keys, message: :invalid }
end
