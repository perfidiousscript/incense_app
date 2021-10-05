# == Schema Information
#
# Table name: ingredients
#
#  id          :uuid             not null, primary key
#  description :text
#  image_url   :string
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
  extend FriendlyId
  friendly_id :name, use: :slugged
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :ingredient_classifications, dependent: :destroy
  has_many :incenses, through: :ingredient_classifications

end
