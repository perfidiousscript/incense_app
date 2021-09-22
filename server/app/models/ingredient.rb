class Ingredient < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :ingredient_classifications, dependent: :destroy
  has_many :incenses, through: :ingredient_classifications

end
