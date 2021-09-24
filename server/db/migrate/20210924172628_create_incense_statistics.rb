class CreateIncenseStatistics < ActiveRecord::Migration[6.1]
  def change
    create_table :incense_statistics, id: :uuid do |t|
      t.references :incense, type: :uuid, null: false, foreign_key: true
      t.integer :rating_avg
      t.integer :price_paid_avg
      t.integer :burn_time_avg
      t.integer :burn_time_sd
      t.integer :sweet_avg
      t.integer :sweet_sd
      t.integer :smokey_avg
      t.integer :smokey_sd
      t.integer :woody_avg
      t.integer :woody_sd
      t.integer :ethereal_avg
      t.integer :ethereal_sd
      t.integer :savory_avg
      t.integer :savory_sd
      t.integer :fruity_avg
      t.integer :fruity_sd
      t.integer :citrus_avg
      t.integer :citrus_sd
      t.integer :herbal_avg
      t.integer :herbal_sd
      t.integer :spicy_avg
      t.integer :spicy_sd
      t.integer :floral_avg
      t.integer :floral_sd
      t.timestamps
    end
  end
end
