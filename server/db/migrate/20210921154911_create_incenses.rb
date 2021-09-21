class CreateIncenses < ActiveRecord::Migration[6.1]
  def change
    create_table :incenses, id: :uuid do |t|
      t.string :name, null: false
      t.references :brand, type: :uuid, null: false, foreign_key: true
      t.references :approved_by, type: :uuid, foreign_key: {to_table: :users}
      t.text :description
      t.timestamps
    end
  end
end
