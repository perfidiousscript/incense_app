FactoryBot.define do
  factory :incense do
    name { Faker::Company.name}
    description { Faker::Company.buzzword }
    image_url { 'www.cool-picture.com' }
    brand
  end

  trait :approved_by do
    approved_by_id { Faker::UUID }
  end
end
