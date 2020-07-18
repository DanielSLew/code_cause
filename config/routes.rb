Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :projects, only: [:index, :show, :create, :destroy]
    end
  end

  # let React-router handle all requests that don't match the above routes
  get '/*path' => 'home#index'
end
