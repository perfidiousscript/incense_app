# == Schema Information
#
# Table name: ingredients
#
#  id          :uuid             not null, primary key
#  description :text
#  image_url   :string
#  name        :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_ingredients_on_slug  (slug) UNIQUE
#
class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :slug
end
