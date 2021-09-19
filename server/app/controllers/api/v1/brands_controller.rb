class Api::V1::BrandsController < Api::V1::BaseController
  before_action :require_login, except: [:show, :index]
  load_and_authorize_resource

  def create
    brand = Brand.new(brand_params)
    if brand.valid?
      if current_user.moderator? || current_user.admin?
        brand.save({approved_by:current_user.id})
      else
        brand.save
      end
      render json: brand, status: :created
    else
      raise Errors::Validation.new('brand', brand)
    end
  end

  def brand_params
    params.require(:brand).permit(:name,:description,:country)
  end
end
