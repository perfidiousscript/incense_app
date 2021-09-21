FactoryBot.define do
  factory :brand do
    name { Faker::Company.name }
    description { Faker::Company.buzzword }
    image_url {'www.cool-picture.com'}
    country { 'Japan' }
    
    trait :approved do
      approved_by_id { '001' }
    end
  end
end
