class BrandSerializer < ActiveModel::Serializer
  attributes :id,
  :country,
  :description,
  :image_url

  has_many :incenses
end
