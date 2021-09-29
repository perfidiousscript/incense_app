Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resource :users, only: %i[create show update] do
        get :current, on: :collection
      end
      resources :brands do
        patch :approve
      end
      resources :incenses do
        patch :approve
      end
      resources :ingredients
      resources :reviews do
        resources :review_vote, only: %i[create update destroy]
      end
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
