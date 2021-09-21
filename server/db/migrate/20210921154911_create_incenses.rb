class CreateIncenses < ActiveRecord::Migration[6.1]
  def change
    create_table :incenses, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.text :image_url
      t.references :brand, type: :uuid, null: false, index: true, foreign_key: true
      t.references :approved_by, type: :uuid, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
