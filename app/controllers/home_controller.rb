class HomeController < ApplicationController
  def index
  	@completed_tasks = current_user.tasks.where(status: 1).rank(:row_order)	
  	@pending_tasks = current_user.tasks.where(status: 0).rank(:row_order)
  	@task = Task.new
  end
end
