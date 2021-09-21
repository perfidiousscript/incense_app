class CreateBrands < ActiveRecord::Migration[6.1]
  def change
    create_table :brands, id: :uuid do |t|
      t.string :name, null: false
      t.string :country, null: false
      t.text :description
      t.text :image_url
      t.references :approved_by, type: :uuid, foreign_key: {to_table: :users}
      t.timestamps
    end
    add_index :brands, :name, unique: true
  end
end
