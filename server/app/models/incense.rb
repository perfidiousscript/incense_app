# == Schema Information
#
# Table name: incenses
#
#  id             :uuid             not null, primary key
#  description    :text
#  image_url      :text
#  name           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  approved_by_id :uuid
#  brand_id       :uuid             not null
#
# Indexes
#
#  index_incenses_on_approved_by_id  (approved_by_id)
#  index_incenses_on_brand_id        (brand_id)
#
# Foreign Keys
#
#  fk_rails_...  (approved_by_id => users.id)
#  fk_rails_...  (brand_id => brands.id)
#
class Incense < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  belongs_to :approved_by, class_name: 'User', optional: true, foreign_key: "approved_by_id"
  belongs_to :brand

  has_many :ingredient_classifications, dependent: :delete_all
  has_many :ingredients, through: :ingredient_classifications

  has_many :reviews
  has_one :incense_statistic
  #has_many :notes through: reviews

  scope :approved, -> {where.not(approved_by_id: nil)}
  scope :pending_approval, -> {where(approved_by_id: nil)}

  def approved?
    approved_by_id != nil
  end
end
