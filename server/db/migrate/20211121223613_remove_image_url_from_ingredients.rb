class RemoveImageUrlFromIngredients < ActiveRecord::Migration[6.1]
  def change
    remove_column :ingredients, :image_url
  end
end
