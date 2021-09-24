class CreateIncenseStatistics < ActiveRecord::Migration[6.1]
  def change
    create_table :incense_statistics, id: :uuid do |t|
      t.references :incense, type: :uuid, null: false, foreign_key: true
      t.float :rating_avg
      t.float :price_paid_avg
      t.float :burn_time_avg
      t.float :burn_time_sd
      t.float :sweet_avg
      t.float :sweet_sd
      t.float :smokey_avg
      t.float :smokey_sd
      t.float :woody_avg
      t.float :woody_sd
      t.float :ethereal_avg
      t.float :ethereal_sd
      t.float :savory_avg
      t.float :savory_sd
      t.float :fruity_avg
      t.float :fruity_sd
      t.float :citrus_avg
      t.float :citrus_sd
      t.float :herbal_avg
      t.float :herbal_sd
      t.float :spicy_avg
      t.float :spicy_sd
      t.float :floral_avg
      t.float :floral_sd
      t.float :earthy_avg
      t.float :earthy_sd
      t.timestamps
    end
  end
end
