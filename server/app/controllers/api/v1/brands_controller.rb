class Api::V1::BrandsController < Api::V1::BaseController
  before_action :require_login, except: [:show, :index]
  load_and_authorize_resource

  def create

    if current_user.moderator? || current_user.admin?
      new_brand_params = brand_params.merge({approved_by_id: current_user.id})
      brand = Brand.create(new_brand_params)
    else
      brand = Brand.create(brand_params)
    end

    if brand.valid?
      render json: brand, status: :created
    else
      raise Errors::Validation.new('brand', brand)
    end
  end

  def brand_params
    params.require(:brand).permit(:name,:description,:country)
  end
end
