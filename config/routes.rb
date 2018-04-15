Rails.application.routes.draw do
  devise_for :users
  namespace :api, format: :json do
    resources :accounts, only: [:index, :show, :create, :update, :destroy]
    resources :ledgers, only: [:index, :show, :create, :update, :destroy] do
      resources :account_statements, only: [:index, :show, :create, :update, :destroy]
    end
  end
  root to: 'react#index'

  get '/*path' => 'react#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
