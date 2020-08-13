module Helpers
  TAG_CATEGORIES = ['cause', 'skill', 'type']
  VERSION = 'v1'

  def version
    VERSION
  end

  def user_params(id)
    { name: "User#{id}",
      email: "user#{id}@email.com",
      password: "testpass" }
  end

  def user_params_full(id)
    { name: "User#{id}",
      email: "user#{id}@email.com",
      password: 'testpass',
      bio: "Hi, I'm a test case",
      social: 'These are my socials',
      organization: 'Test Inc.' }
  end

  def project_params(id)
    { name: "Test#{id}",
      description: 'This is a test description',
      body: 'This is a test body' }
  end

  def tag_params(id)
    { name: "tag#{id}", category: TAG_CATEGORIES.sample}
  end

  def create_projects_users_tags_votes(num=2)
    num.times do |num|
      project = Project.create!(project_params(num))
      user = User.create!(user_params(num))
      tag = Tag.create!(tag_params(num))

      project.votes.create(user_id: user.id)
      project.tags << tag

      project.add_creator(user)
    end

    Project.first.add_contributor(User.second)
  end

  def create_users(num)
    num.times do |num|
      User.create!(user_params_full(num))
    end
  end
end