Happycalendar::Application.routes.draw do

  root 'calendars#index'

  get 'login' => 'sessions#new', as: 'login'
  get 'logout' => 'sessions#destroy', as: 'logout'

  get 'calendar/:calendar_id/day/:month/:day/:year' => 'days#edit'

  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :calendars
  resources :days, only: [:index, :update]
end
