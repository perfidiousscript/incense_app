class Incense < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  belongs_to :approved_by, class_name: 'User', optional: true, foreign_key: "approved_by_id"
  belongs_to :brand

  has_many :ingredient_classifications, dependent: :delete_all
  has_many :ingredients, through: :ingredient_classifications

  has_many :reviews
  #has_many :notes through: reviews

  scope :approved, -> {where.not(approved_by_id: nil)}

  def approved?
    approved_by_id != nil
  end
end
