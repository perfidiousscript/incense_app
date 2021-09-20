class Api::V1::BrandsController < Api::V1::BaseController
  before_action :require_login, except: [:show, :index]
  before_action :find_brand, only: [:show, :approve]
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

  def approve
    @brand.update({approved_by_id: current_user.id})

    if @brand.valid?
      render json: @brand, status: :ok
    else
      raise Errors::UnprocessableEntity.new('could not approve brand')
    end
  end

  private

  def find_brand
    @brand = Brand.find_by_id(params[:brand_id])
  end

  def brand_params
    params.require(:brand).permit(:name,:description,:country)
  end
end
