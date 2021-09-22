class Ingredient < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :ingredient_classifications, dependent: :delete_all
  has_many :ingredients, through: :ingredient_classifications

end
