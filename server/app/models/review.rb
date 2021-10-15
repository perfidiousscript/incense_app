# == Schema Information
#
# Table name: reviews
#
#  id             :uuid             not null, primary key
#  burn_time      :integer
#  citrus         :float            default(0.0), not null
#  earthy         :float            default(0.0), not null
#  ethereal       :float            default(0.0), not null
#  floral         :float            default(0.0), not null
#  fruity         :float            default(0.0), not null
#  herbal         :float            default(0.0), not null
#  price_paid     :integer
#  rating         :float            default("neutral")
#  review_body    :text
#  savory         :float            default(0.0), not null
#  smokey         :float            default(0.0), not null
#  spicy          :float            default(0.0), not null
#  sweet          :float            default(0.0), not null
#  woody          :float            default(0.0), not null
#  year_purchased :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  incense_id     :uuid             not null
#  user_id        :uuid             not null
#
# Indexes
#
#  index_reviews_on_incense_id  (incense_id)
#  index_reviews_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (incense_id => incenses.id)
#  fk_rails_...  (user_id => users.id)
#
class Review < ApplicationRecord
  belongs_to :user
  belongs_to :incense
  # has_many :notes
  validates :incense_id , presence: true

  has_one :review_ranking
  has_many :review_votes

  property_list = %i|sweet smokey woody ethereal savory fruity herbal spicy citrus floral earthy|

  property_list.each do |property|
    validates property, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  end


  enum rating: {
    hate: 0,
    dislike: 1,
    neutral: 2,
    like: 3,
    love: 4
  }
end
