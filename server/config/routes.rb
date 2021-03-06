Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resource :users, only: %i[create show update] do
        get :current, on: :collection
        patch :confirm_email
      end
      resources :brands, param: :slug do
        patch :approve
      end
      resources :incenses, param: :slug do
        patch :approve
      end
      resources :ingredients, param: :slug
      resources :reviews
      resources :review_votes, only: %i[create update destroy]
      resource :sessions, only: %i[create destroy]
    end
  end
  namespace :moderator do
    namespace :v1 do
      resources :approvals, only: %i[index]
    end
  end
  namespace :admin do
    namespace :v1 do
      resources :users, only: %i[index update]
    end
  end
end
