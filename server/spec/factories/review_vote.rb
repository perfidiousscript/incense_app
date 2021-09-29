FactoryBot.define do
  factory :review_vote do
    user
    review
    vote_type {'up'}

    trait :down do
      vote_type { 'down' }
    end
  end
end
