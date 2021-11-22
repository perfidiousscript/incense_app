# == Schema Information
#
# Table name: brands
#
#  id             :uuid             not null, primary key
#  country        :string           not null
#  description    :text
#  name           :string           not null
#  slug           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  approved_by_id :uuid
#
# Indexes
#
#  index_brands_on_approved_by_id  (approved_by_id)
#  index_brands_on_name            (name) UNIQUE
#  index_brands_on_slug            (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (approved_by_id => users.id)
#
class BrandSerializer < ActiveModel::Serializer
  attributes :id,
  :name,
  :country,
  :description,
  :image_url,
  :slug

  has_many :incenses
end
