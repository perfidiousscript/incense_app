class Brand < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :country, inclusion: { in: ISO3166::Country.all.map(&:name) }

  def approved?
    approved_by_id != nil
  end
end
