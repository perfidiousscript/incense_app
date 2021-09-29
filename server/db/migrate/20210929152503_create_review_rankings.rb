class CreateReviewRankings < ActiveRecord::Migration[6.1]
  def change
    create_table :review_rankings, id: :uuid do |t|
      t.references :review, type: :uuid, null: false, foreign_key: true
      t.integer :ups, default: 0
      t.integer :downs, default: 0
      t.timestamps
    end
  end
end
