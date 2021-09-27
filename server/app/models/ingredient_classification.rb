# == Schema Information
#
# Table name: ingredient_classifications
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  incense_id    :uuid             not null
#  ingredient_id :uuid             not null
#
# Indexes
#
#  index_ingredient_classifications_on_incense_id     (incense_id)
#  index_ingredient_classifications_on_ingredient_id  (ingredient_id)
#
# Foreign Keys
#
#  fk_rails_...  (incense_id => incenses.id)
#  fk_rails_...  (ingredient_id => ingredients.id)
#
class IngredientClassification < ApplicationRecord
  belongs_to :incense
  belongs_to :ingredient
end
