class IncenseSerializer < ActiveModel::Serializer
  attributes :id,
  :description,
  :image_url,
  :brand

  has_many :ingredients
  has_one :incense_statistic
end
