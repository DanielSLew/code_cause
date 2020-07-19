Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :projects, except: [:new, :edit]
      resources :users, except: [:new, :edit]
    end
  end

  # let React-router handle all requests that don't match the above routes
  get '/*path' => 'home#index'
end
