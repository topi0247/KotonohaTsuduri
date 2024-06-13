Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        omniauth_callbacks: 'api/v1/auth/omniauth_callbacks',
        token_validations:  'api/v1/auth/token_validations',
      }
      resources :posts, only: [:index, :show] do
        member do
          resource :letter, only: [:create]
          resource :genres, only: [:index]
          resource :tags, only: [:index]
        end
      end
    end
  end
  root 'application#index'
end
