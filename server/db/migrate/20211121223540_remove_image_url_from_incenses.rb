class RemoveImageUrlFromIncenses < ActiveRecord::Migration[6.1]
  def change
    remove_column :incenses, :image_url
  end
end
