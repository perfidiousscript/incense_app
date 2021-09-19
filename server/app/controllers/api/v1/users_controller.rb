class Api::V1::UsersController < Api::V1::BaseController
  before_action :require_login, except: :create
  load_and_authorize_resource

  def create
    user = User.create(user_params.merge({ role: :user }))

    if user.valid?
      sign_in user
      render json: user, status: :created
    else
      raise Errors::Validation.new('user', user)
    end
end

def update
  if current_user.update(params).success?
    render json: update_user.result, status: :ok
  else
    raise Errors::Validation.new('user', update_user)
  end
end

def current
  if current_user
    render json: current_user, status: :ok
  else
    raise Errors::Unauthorized.new
  end
end

def user_params
  params.require(:user).permit(:username, :email, :password)
end
end
