class Api::V1::UserController < Api::V1::BaseController
  before_action :require_login, except: :create
  load_and_authorize_resource
  def create
  create_user = Users::Create.call(params)

  if create_user.success?
    user = create_user.result
    sign_in user
    render json: user, status: :created
  else
    raise Errors::Validation.new('user', create_user)
  end
end

def update
  update_user = Users::Update.call(current_user, params)
  if update_user.success?
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
