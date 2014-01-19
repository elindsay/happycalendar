Happycalendar::Application.routes.draw do

  root 'calendars#index'

  get 'login' => 'sessions#new', as: 'login'
  get 'logout' => 'sessions#destroy', as: 'logout'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :calendars
  resources :days
end
