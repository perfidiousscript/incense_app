class CreateReviewVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :review_votes, id: :uuid do |t|
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.references :review, type: :uuid, null: false, foreign_key: true
      t.integer :vote_type, null:false
      t.timestamps
    end
  end
end
