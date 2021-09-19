class CreateBrands < ActiveRecord::Migration[6.1]
  def change
    create_table :brands, id: :uuid do |t|
      t.string :name, null: false
      t.string :country, null: false
      t.text :description
      t.references :user, type: :uuid, foreign_key: true
      t.timestamps
    end
    add_index :brands, :name, unique: true
  end
end
