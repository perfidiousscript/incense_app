FactoryBot.define do
  factory :review do
    incense
    user
    price_paid { rand(2.00..185.00) }
    rating { rand(0..4) }
    review_body {  Faker::Lorem.paragraph(sentence_count: rand(0..10)) }
    burn_time { rand(10..360)}
    year_purchased { rand(1980..2021)}
    sweet { rand(0..5) }
    smokey { rand(0..5) }
    woody { rand(0..5) }
    ethereal { rand(0..5) }
    savory { rand(0..5) }
    fruity { rand(0..5) }
    citrus { rand(0..5) }
    herbal { rand(0..5) }
    spicy { rand(0..5) }
    floral { rand(0..5) }
    earthy { rand(0..5) }
  end
end
