module Helpers
  def user_params(id)
    { name: "User#{id}",
    email: "user#{id}@email.com",
    password: "testpass" }
  end

  
end