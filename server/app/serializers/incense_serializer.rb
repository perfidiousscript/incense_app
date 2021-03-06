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
class IncenseSerializer < ActiveModel::Serializer
  attributes :id,
  :name,
  :description,
  :slug,
  :brand,
  :image_url,
  :user_review

  has_one :incense_statistic
  has_many :ingredients, through: :ingredient_classifications
  has_many :reviews

  def user_review
    if(scope)
      object.reviews.find_by(user_id: scope.id)
    end
  end

  def brand
    brand_values = object.brand
    {
      name: brand_values.name,
      slug: brand_values.slug,
      country: brand_values.country,
    }
  end

end
