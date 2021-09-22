class IncenseSerializer < ActiveModel::Serializer
  attributes :id,
  :description,
  :image_url,
  :brand

  has_many :ingredients
end
