# == Schema Information
#
# Table name: ingredients
#
#  id          :uuid             not null, primary key
#  description :text
#  name        :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_ingredients_on_slug  (slug) UNIQUE
#
class Ingredient < ApplicationRecord
  include Rails.application.routes.url_helpers
  extend FriendlyId
  friendly_id :name, use: :slugged
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :ingredient_classifications, dependent: :destroy
  has_many :incenses, through: :ingredient_classifications

  has_one_attached :image

  def image_url
    url_for(self.image) unless self.image
  end

end
