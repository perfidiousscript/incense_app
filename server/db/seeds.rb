# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if RAILS_ENV = 'development'
  moderator = User.create(email: 'dingleberry_jones@fake.com', password: "password", username: Faker::Name.first_name, role: 'moderator' )
  user = User.create(email: 'user@fake.com', password: "password", username: Faker::Name.first_name, role: 'user' )
  User.create(email: 'new_user@fake.com', password: "password", username: Faker::Name.first_name, role: 'user' )
  3.times {Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword,  country: 'Japan', approved_by: user)}
  brand_1 = Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword,  country: 'Japan', approved_by: user)
  brand_2 = Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword,  country: 'Japan', approved_by: user)
  3.times {Incense.create!(name: Faker::Company.name, description: Faker::Company.buzzword,  brand: brand_1 , approved_by: user)}
  3.times {Incense.create!(name: Faker::Company.name, description: Faker::Company.buzzword,  brand: brand_2 , approved_by: user)}
  Ingredient.create!(name: 'Frankincense', description: 'Sap from an Eastern african Tree' )
  Ingredient.create!(name: 'Myrrh', description: 'Sap from another Eastern african Tree' )
  Ingredient.create!(name: 'Oud', description: 'you know you love it', )
  Incense.all.each do |incense|
    rand(1..2).times do
      IngredientClassification.create!(ingredient: Ingredient.all.sample, incense: incense)
    end
    sweetRating =  rand(1..4)
   smokeyRating =  rand(1..4)
   woodyRating =  rand(1..4)
   etherealRating =  rand(1..4)
   savoryRating =  rand(1..4)
   fruityRating =  rand(1..4)
   herbalRating =  rand(1..4)
   spicyRating =  rand(1..4)
   citrusRating =  rand(1..4)
   floralRating =  rand(1..4)
   earthyRating =  rand(1..4)
    Review.create!(
      user: moderator,
      incense: incense,
                    review_body: 'pretty good stuff',
                    rating: rand(0..4),
                    price_paid: rand(10..100),
                    sweet: (sweetRating + rand(-1..1)),
                   smokey: (smokeyRating + rand(-1..1)),
                   woody: (woodyRating + rand(-1..1)),
                   ethereal: (etherealRating + rand(-1..1)),
                   savory: (savoryRating + rand(-1..1)),
                   fruity: (fruityRating + rand(-1..1)),
                   herbal: (herbalRating + rand(-1..1)),
                   spicy: (spicyRating + rand(-1..1)),
                   citrus: (citrusRating + rand(-1..1)),
                   floral: (floralRating + rand(-1..1)),
                   earthy: (earthyRating + rand(-1..1)),
                   burn_time: rand(10..120),
                   year_purchased: rand(1980..2021)
                 )
       Review.create!(
         user: user,
         incense: incense,
                       review_body: 'pretty good stuff',
                       rating: rand(0..4),
                       price_paid: rand(10..100),
                       sweet: sweetRating + rand(-1..1),
                      smokey: smokeyRating + rand(-1..1),
                      woody: woodyRating + rand(-1..1),
                      ethereal: etherealRating + rand(-1..1),
                      savory: savoryRating + rand(-1..1),
                      fruity: fruityRating + rand(-1..1),
                      herbal: herbalRating + rand(-1..1),
                      spicy: spicyRating + rand(-1..1),
                      citrus: citrusRating + rand(-1..1),
                      floral: floralRating + rand(-1..1),
                      earthy: earthyRating + rand(-1..1),
                      burn_time: rand(10..120),
                      year_purchased: rand(1980..2021)
                    )
      IncenseStatistics::Calculate.call(incense)
  end
  Review.all.each do |review|
    ReviewRanking.create!(review: review)
  end
end
