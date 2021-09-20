FactoryBot.define do
  factory :brand do
    name { Faker::Company.name }
    description { Faker::Company.buzzword }
    country { 'Japan' }
  end
end
