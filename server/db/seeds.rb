# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: 'dingleberry_jones@fake.com', password: "password", username: Faker::Name.first_name, role: 'moderator' )
3.times {Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', country: 'Japan', approved_by: user)}
brand_1 = Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', country: 'Japan', approved_by: user)
brand_2 = Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', country: 'Japan', approved_by: user)
3.times {Incense.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', brand: brand_1 , approved_by: user)}
3.times {Incense.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', brand: brand_2 , approved_by: user)}
Ingredient.create!(name: 'Frankincense', description: 'Sap from an Eastern african Tree', image_url: 'www.cool-picture.com')
Ingredient.create!(name: 'Myrrh', description: 'Sap from another Eastern african Tree', image_url: 'www.cool-picture.com')
Ingredient.create!(name: 'Oud', description: 'you know you love it', image_url: 'www.cool-picture.com')
Incense.all.each do |incense|
  rand(1..2).times do
    IngredientClassification.create!(ingredient: Ingredient.all.sample, incense: incense)
  end
  Review.create!(
    user: user,
    incense: incense,
                  review_body: 'pretty good stuff',
                  rating: rand(0..5),
                  price_paid: rand(10..100),
                  sweet: rand(0..5),
                 smokey: rand(0..5),
                 woody: rand(0..5),
                 ethereal: rand(0..5),
                 savory: rand(0..5),
                 fruity: rand(0..5),
                 herbal: rand(0..5),
                 spicy: rand(0..5),
                 citrus: rand(0..5),
                 floral: rand(0..5),
                 earthy: rand(0..5),
                 burn_time: rand(10..120),
                 year_purchased: rand(1980..2021))
end
