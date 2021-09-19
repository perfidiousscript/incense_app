class Admin::V1::UsersController < Admin::V1::BaseController
  load_and_authorize_resource

  def index
    users = User.all

    render json: users
  end

  def show
    user = User.find(params[:id])

    if user != nil
      render json: user
    else
      raise Errors::NotFound.new('user')
    end
  end

  def update
    if current_user.update(user_params)
      render json: current_user, status: :ok
    else
      raise Errors::Validation.new('user', user)
    end
  end

  def user_params
    params.permit(:username, :email, :password)
  end
end
