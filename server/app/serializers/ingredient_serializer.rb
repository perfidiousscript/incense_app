# == Schema Information
#
# Table name: ingredients
#
#  id          :uuid             not null, primary key
#  description :text
#  image_url   :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
end
