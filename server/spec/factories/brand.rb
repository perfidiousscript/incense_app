FactoryBot.define do
  factory :brand do
    name { Faker::Company.name }
    description { Faker::Company.buzzword }
    country { 'Japan' }

    trait :approved do
      before(:create) do |brand|
        mod_user = create(:user, :moderator)
        brand.approved_by_id = mod_user.id
      end
    end
  end
end
