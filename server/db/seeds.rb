# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: Faker::Internet.email, password: "password", username: Faker::Name.first_name, role: 'moderator' )
3.times {Brand.create!(name: Faker::Company.name, description: Faker::Company.buzzword, image_url: 'www.cool-picture.com', country: 'Japan', approved_by: user)}
