# == Schema Information
#
# Table name: incenses
#
#  id             :uuid             not null, primary key
#  description    :text
#  name           :string           not null
#  slug           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  approved_by_id :uuid
#  brand_id       :uuid             not null
#
# Indexes
#
#  index_incenses_on_approved_by_id  (approved_by_id)
#  index_incenses_on_brand_id        (brand_id)
#  index_incenses_on_slug            (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (approved_by_id => users.id)
#  fk_rails_...  (brand_id => brands.id)
#
class Incense < ApplicationRecord
  include Rails.application.routes.url_helpers
  extend FriendlyId
  friendly_id :name, use: :slugged
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
  scope :filtered, -> (query_params) {Incense::Filter.new.filter(self, query_params)}

  has_one_attached :image

  def image_url
    url_for(self.image) unless self.image
  end

  def approved?
    approved_by_id != nil
  end
end
