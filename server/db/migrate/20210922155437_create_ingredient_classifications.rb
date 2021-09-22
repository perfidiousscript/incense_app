class CreateIngredientClassifications < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredient_classifications, id: :uuid do |t|
      t.references :incense, type: :uuid, null: false, foreign_key: true
      t.references :ingredient, type: :uuid, null: false, foreign_key: true
      t.timestamps
    end
  end
end
