class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews, id: :uuid do |t|
      t.references :incense, type: :uuid, null: false, foreign_key: true
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.integer :price_paid
      t.float :rating, default: 2
      t.text :review_body
      t.integer :burn_time
      t.integer :year_purchased
      t.float :sweet, default: 0, null: false
      t.float :smokey, default: 0, null: false
      t.float :woody, default: 0, null: false
      t.float :ethereal, default: 0, null: false
      t.float :savory, default: 0, null: false
      t.float :fruity, default: 0, null: false
      t.float :citrus, default: 0, null: false
      t.float :herbal, default: 0, null: false
      t.float :spicy, default: 0, null: false
      t.float :floral, default: 0, null: false
      t.float :earthy, default: 0, null:false
      t.timestamps
    end
  end
end
