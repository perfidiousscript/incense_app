class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients, id: :uuid do |t|
      t.string :name
      t.text :description
      t.string :image_url
      t.timestamps
    end
  end
end
