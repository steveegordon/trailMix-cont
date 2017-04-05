Rails.application.routes.draw do
  root 'pages#welcome'
  get '/trails' => 'pages#index'
  get '/trails/trailinfo' => 'pages#show'
  get '/users' => 'users#index'
  get 'signup' => 'users#new'
  post '/users' => 'users#create'
  delete 'signout' => 'users#destroy'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'

  get '/about' => 'pages#about'
  get '/help' => 'pages#help'
  get '/contact' => 'pages#contact'
end
