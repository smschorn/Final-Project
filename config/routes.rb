Rails.application.routes.draw do
  devise_for :users
  namespace :api, format: :json do
    resources :accounts, only: [:index, :create, :update, :destroy]
  end
  root to: 'react#index'

  get '/*path' => 'react#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
