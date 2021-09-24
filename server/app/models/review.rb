class Review < ApplicationRecord
  belongs_to :user
  belongs_to :incense
  # has_many :notes

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
