Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :incenses
      resource :users, only: %i[create update] do
        get :current, on: :collection
      end
      resources :brands do
        patch :approve
      end
    end
  end
  namespace :admin do
    namespace :v1 do
      resources :users, only: %i[index show update]
    end
  end
end
