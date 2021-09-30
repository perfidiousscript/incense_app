# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: Faker::Internet.email, password: "password", username: Faker::Name.first_name, role: 'moderator' )
3.times {Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', country: 'Japan', approved_by: user)}
brand_1 = Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', country: 'Japan', approved_by: user)
3.times {Incense.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', brand: brand_1 , approved_by: user)}
Ingredient.create!(name: 'Frankincense', description: 'Sap from an Eastern african Tree', image_url: 'www.cool-picture.com')
Ingredient.create!(name: 'Myrrh', description: 'Sap from another Eastern african Tree', image_url: 'www.cool-picture.com')
Ingredient.create!(name: 'Oud', description: 'you know you love it', image_url: 'www.cool-picture.com')
Incense.all.each do |incense|
  rand(1..2).times do
    IngredientClassification.create!(ingredient: Ingredient.take, incense: incense)
  end
end
