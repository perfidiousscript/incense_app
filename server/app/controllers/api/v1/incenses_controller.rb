class Api::V1::IncensesController < Api::V1::BaseController
  before_action :require_login, except: [:show, :index]
  before_action :find_incense, only: [:show, :approve]
  load_and_authorize_resource

  def create
    if current_user.moderator? || current_user.admin?
      new_incense_params = incense_params.merge({approved_by_id: current_user.id})
      incense = Incense.create(new_incense_params)
    else
      incense = Incense.create(incense_params)
    end

    if incense.valid?
      render json: incense, status: :created
    else
      raise Errors::Validation.new('brand', incense)
    end
  end

  private

  def find_incense
    @incense = Incense.find_by_id(params[:brand_id])
  end

  def incense_params
    params.require(:incense).permit(:name,:brand_id,:description,:image_url)
  end
end
