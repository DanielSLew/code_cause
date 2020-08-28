# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Variables to set up seed data
NUM_PROJECTS_USERS = 50

project_body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo euismod fringilla. Aenean id risus bibendum, condimentum lacus ut, suscipit enim. In mollis varius porta. Morbi facilisis ante non velit fringilla consequat. Donec vel lectus interdum, facilisis massa ut, rutrum neque. Integer imperdiet, orci eget feugiat egestas, sem justo convallis arcu, quis iaculis ante massa vitae felis. Aenean justo lectus, dapibus a est tempus, scelerisque vulputate neque. Donec molestie ex at dui fermentum, non ornare augue dignissim. Duis vel ante augue.

Pellentesque ac arcu ut turpis elementum pretium. Mauris laoreet at justo a pretium. Phasellus tincidunt commodo lacus, et condimentum orci posuere non. Duis egestas tempus nulla sed pretium. Morbi pulvinar in ipsum sollicitudin tristique. Nunc eget sapien malesuada, feugiat lorem in, ultrices augue. Sed fermentum tellus id cursus ultricies. Donec venenatis augue id tellus rhoncus maximus nec eget urna. Fusce vestibulum, odio eu faucibus varius, ligula massa consectetur diam, molestie faucibus ante velit ut ex. Nulla ut mauris augue. Praesent pulvinar pharetra sagittis. Aliquam erat volutpat. Fusce ac lacus ut nunc condimentum vehicula sit amet a enim. Vivamus vel varius purus, tempor ullamcorper mi.

Aenean ac suscipit nulla, eget mattis tellus. Integer vel dictum diam. Vivamus elementum nec massa quis sagittis. Sed et gravida tortor, sed pretium est. Morbi malesuada ultrices justo, vel fermentum massa sollicitudin vitae. Proin tincidunt, justo id mattis fringilla, turpis elit faucibus sapien, eget hendrerit ex urna non ante. Maecenas sollicitudin nunc dui, vitae pharetra ante posuere luctus. Nulla at lacus laoreet, gravida mi a, mollis ex. Nulla facilisi. Sed accumsan quam eu nibh accumsan, ac vehicula neque finibus. Cras elementum laoreet mauris. Curabitur at ex blandit, euismod velit sit amet, efficitur erat. Suspendisse bibendum erat leo, in posuere erat blandit sed. Quisque magna nibh, convallis sit amet ornare quis, pretium ac felis. Suspendisse quis placerat odio.

Ut rhoncus lectus justo, quis tincidunt nisi pharetra et. Ut eu imperdiet elit, ac pellentesque purus. Morbi mollis eros nec est pellentesque ornare. Praesent tempus tellus vitae purus tincidunt, sed ullamcorper turpis auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In et lectus odio. Aliquam at luctus mauris. Sed urna enim, viverra nec sapien at, accumsan iaculis ligula. Nulla convallis lacus non diam lacinia facilisis. In tellus lectus, consectetur non odio viverra, semper ullamcorper tortor. Morbi vel felis volutpat, porttitor orci vestibulum, lacinia dolor.

Etiam vitae porta lacus. Morbi fringilla tristique placerat. Quisque vel elementum neque. Proin rutrum lacus quis tellus tempus, et efficitur sapien gravida. Integer in massa sit amet nisi iaculis ultricies malesuada non nisi. Maecenas nec laoreet nunc. Sed interdum odio sit amet nibh imperdiet, malesuada venenatis sapien sodales. Sed quis luctus lectus, blandit porta enim. Maecenas non ultricies ligula, id porttitor nisi. Integer nec luctus ex."

project_body_lengths = [10, 50, 100, 300, 500, 1000]
project_description_lengths = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

skill_tags = ["Logo", "Server", "SEO", "Interactive UI", "Database", "Design", "SVG Graphics", "React", "HTML", "Rails", "CSS", "Javascript", "Ruby", "COBOL", "Layout Design", "UX/UI"]
type_tags = ["Mobile App", "Browser App", "Desktop App", "IoT", "Raspberry Py", "Static page", "Multiplatform App", "Blog", "E-Commerce Site", "DApp"]
cause_tags = ["Healthcare", "COVID", "Research", "Social", "Public Utility", "Open Source"]

# Create 3 Categories of tags
skill_tags.each do |tag|
  Tag.create(
    name: tag,
    category: 'skill'
  )
end

type_tags.each do |tag|
  Tag.create(
    name: tag,
    category: 'type'
  )
end

cause_tags.each do |tag|
  Tag.create(
    name: tag,
    category: 'cause'
  )
end

NUM_PROJECTS_USERS.times do |i|
  # Create x amount of users
  User.create(
    name: "User-#{i}",
    email: "user#{i}@email.com",
    password: "password#{i}",
    bio: "Bio for user#{i}",
    social: "Socials for user#{i}",
    organization: "Organization#{i}"
  )
  # Create x amount of projects w/ varying body lengths
  description = project_body[0..project_description_lengths.sample]
  project_params = [ 
    {"question" => "Tell us about your project idea, What's the elevator pitch?",
      "answer" => description},
    {"question" => "What problem is your project going to solve.",
      "answer" => project_body[0..project_body_lengths.sample]},
    {"question" => "What ideas do you have about solving this problem?",
      "answer" => project_body[0..project_body_lengths.sample]},
    {"question" => "What do you need from a contributor?",
      "answer" => project_body[0..project_body_lengths.sample]},
    {"question" => "What kind of experience do you have working with developers?",
      "answer" => project_body[0..project_body_lengths.sample]},
    {"question" => "What will your project look like when it's finished?",
      "answer" => project_body[0..project_body_lengths.sample]},
    {"question" => "What do you want to call your project?",
      "answer" => "Project-#{i}"},
    {"question" => "Is there anything else you want to include that you haven't already?",
      "answer" => project_body[0..project_body_lengths.sample]}
  ]
  # project_questions = %Q([{"question":"Tell us about your project idea, What's the elevator pitch?","answer":"#{project_body[0..project_description_lengths.sample]}"},{"question":"What problem is your project going to solve.","answer":"#{project_body[0..project_body_lengths.sample]}"},{"question":"What ideas do you have about solving this problem?","answer":"#{project_body[0..project_body_lengths.sample]}"},{"question":"What do you need from a contributor?","answer":"#{project_body[0..project_body_lengths.sample]}"},{"question":"What kind of experience do you have working with developers?","answer":"#{project_body[0..project_body_lengths.sample]}"},{"question":"What will your project look like when it's finished?","answer":"#{project_body[0..project_body_lengths.sample]}"},{"question":"What do you want to call your project?","answer":"#{project_body[0..project_name_lengths.sample]}"},{"question":"Is there anything else you want to include that you haven't already?","answer":"#{project_body[0..project_body_lengths.sample]}"}])
  Project.create(
    name: "Project-#{i}",
    description: description,
    body: project_params.to_json,
  )
end


# Gather all users in an array
users = User.all

Project.all.each do |project|
  # Assign each project cause, skill, type tags
  project.tags << (Tag.where(category: 'cause').sample(rand(1..2)))
  project.tags << (Tag.where(category: 'type').sample(rand(1..2)))
  project.tags << (Tag.where(category: 'skill').sample(rand(1..5)))

  # Assign each project creators and contributors (ProjectPermissions)
  users.sample(rand(1..2)).each do |user|
    project.add_creator(user)
  end

  users.sample(rand(0..3)).each do |user|
    project.add_contributor(user)
  end

  # Create votes assigned to a project and user
  users.sample(rand(0..(NUM_PROJECTS_USERS/2))).each do |user|
    project.votes.create(user_id: user.id)
  end
end



