class Brand < ApplicationRecord
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
