# == Schema Information
#
# Table name: review_rankings
#
#  id         :uuid             not null, primary key
#  downs      :integer          default(0)
#  magnitude  :integer          default(0)
#  ranking    :integer          default(0)
#  ups        :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  review_id  :uuid             not null
#
# Indexes
#
#  index_review_rankings_on_review_id  (review_id)
#
# Foreign Keys
#
#  fk_rails_...  (review_id => reviews.id)
#
class ReviewRanking < ApplicationRecord
  belongs_to :review
end
