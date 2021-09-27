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
class IncenseSerializer < ActiveModel::Serializer
  attributes :id,
  :description,
  :image_url,
  :brand

  has_many :ingredients
  has_one :incense_statistic
end
