# == Schema Information
#
# Table name: brands
#
#  id             :uuid             not null, primary key
#  country        :string           not null
#  description    :text
#  image_url      :text
#  name           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  approved_by_id :uuid
#
# Indexes
#
#  index_brands_on_approved_by_id  (approved_by_id)
#  index_brands_on_name            (name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (approved_by_id => users.id)
#
class Brand < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :country, inclusion: { in: ISO3166::Country.all.map(&:name) }

  belongs_to :approved_by, class_name: 'User', optional: true, foreign_key: "approved_by_id"

  scope :approved, -> {where.not(approved_by_id: nil)}
  scope :pending_approval, -> {where(approved_by_id: nil)}

  has_many :incenses

  def approved?
    !approved_by_id.nil?
  end
end
