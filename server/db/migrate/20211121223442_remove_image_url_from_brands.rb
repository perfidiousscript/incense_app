class RemoveImageUrlFromBrands < ActiveRecord::Migration[6.1]
  def change
  remove_column :brands, :image_url
  end
end
