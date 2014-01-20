class SessionsController < ApplicationController
  def new
    logger.debug("$"*50)
    logger.debug(params)
    @new_user = params[:new_user]
  end

  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      session[:user_id] = user.id
      redirect_to root_url
    else
      flash.now.alert = "No!"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
end
