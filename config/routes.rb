Rails.application.routes.draw do
  root to: 'home#index'

  resources :photos, only: :create
end
