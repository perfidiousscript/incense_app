class Api::V1::ReviewsController < Api::V1::BaseController
  before_action :require_login, only: [:create, :update]
  load_and_authorize_resource
end
