class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.references :incense, type: :uuid, null: false, foreign_key: true
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.integer :price_paid
      t.integer :rating, default: 2
      t.text :review_body
      t.integer :burn_time
      t.integer :year_purchased
      t.integer :sweet, default: 0, null: false
      t.integer :smokey, default: 0, null: false
      t.integer :woody, default: 0, null: false
      t.integer :ethereal, default: 0, null: false
      t.integer :savory, default: 0, null: false
      t.integer :fruity, default: 0, null: false
      t.integer :citrus, default: 0, null: false
      t.integer :herbal, default: 0, null: false
      t.integer :spicy, default: 0, null: false
      t.integer :floral, default: 0, null: false
      t.timestamps
    end
  end
end
