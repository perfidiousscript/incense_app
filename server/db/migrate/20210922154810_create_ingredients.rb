class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients, id: :uuid do |t|
      t.string :title
      t.text :decription
      t.string :image_url
      t.timestamps
    end
  end
end
