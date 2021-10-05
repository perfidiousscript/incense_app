class AddSlugToIncenses < ActiveRecord::Migration[6.1]
  def change
    add_column :incenses, :slug, :string
    add_index :incenses, :slug, unique: true
  end
end
