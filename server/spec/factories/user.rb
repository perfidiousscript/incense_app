FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "password" }
    username { Faker::Name.first_name }
    role { :user }

    trait :moderator do
      role { :moderator }
    end

    trait :admin do
      role { :admin }
    end

  end
end
