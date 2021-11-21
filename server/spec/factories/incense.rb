FactoryBot.define do
  factory :incense do
    name { Faker::Company.name}
    description { Faker::Company.buzzword }
    brand

    trait :approved do
      before(:create) do |incense|
        user = create(:user, :moderator)
        incense.approved_by_id = user.id
      end
    end
  end

end
