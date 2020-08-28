Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      
      resources :projects, except: [:new, :edit] do
        post "/contributor", to: "project#create_contributor"
        delete "/contributor", to: "project#destroy_contributor"

        resources :votes, only: [:create, :destroy]
        resources :messages, except: [:new, :edit]
      end

      resources :users, except: [:new, :edit]
      resources :tags, only: [:create, :update]
      
      post "/login",         to: "authorization#login"
      get "/auto_login",     to: "authorization#auto_login"
      get "/user_is_authed", to: "authorization#user_is_authed"
    end
  end

  # let React-router handle all requests that don't match the above routes
  get '/*path' => 'home#index'
end
