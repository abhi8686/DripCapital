Rails.application.routes.draw do

	post "tasks/update_status", to: "tasks#update_status"
	post "tasks/update_sort", to: "tasks#update_sort"
  resources :tasks
  get 'home/index'
  devise_for :users

	devise_scope :user do
	  authenticated :user do
	    root 'home#index', as: :authenticated_root
	  end

	  unauthenticated do
	    root 'devise/sessions#new', as: :unauthenticated_root
	  end
	end
end
