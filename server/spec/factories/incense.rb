FactoryBot.define do
  factory :incense do
    name { Faker::Company.name}
    description { Faker::Company.buzzword }
    image_url { 'www.cool-picture.com' }
    brand

    trait :approved do
      after(:create) do |incense|
        user = create(:user, :moderator)
        incense.approved_by_id = user.id
      end
    end
  end

end
