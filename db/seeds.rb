# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

9.times do |i|
  User.create(
    name: "User-#{i}",
    email: "user#{i}@email.com",
    password: "password#{i}",
    bio: "Bio for user#{i}",
    social: "Socials for user#{i}",
    organization: "Organization#{i}"
  )

  Project.create(
    name: "Project-#{i}",
    description: "This is a description for project#{i}",
    body: "This is the body for project #{i}",
    creator: i
  )
end