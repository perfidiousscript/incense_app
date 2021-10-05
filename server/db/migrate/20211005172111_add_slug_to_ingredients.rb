class AddSlugToIngredients < ActiveRecord::Migration[6.1]
  def change
    add_column :ingredients, :slug, :string
    add_index :ingredients, :slug, unique: true
  end
end
