FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { "password" }
    username { Faker::Name.first_name }
    role { :user }
    email_confirmed_at {DateTime.now.to_date}

    trait :moderator do
      role { :moderator }
    end

    trait :admin do
      role { :admin }
    end

    trait :unconfirmed do
      email_confirmed_at {nil}
    end

  end
end
