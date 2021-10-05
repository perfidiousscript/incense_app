class Api::V1::BrandsController < Api::V1::BaseController
  before_action :require_login, except: [:show, :index]
  before_action :find_brand, only: :approve
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

  def show
    brand = Brand.includes(:incenses).friendly.find(id: params[:id])

    unless brand.approved?
      raise Errors::NotFound.new('brand') unless current_user && (current_user.moderator? || current_user.admin?)
    end

    if brand != nil
      render json: brand
    else
      raise Errors::NotFound.new('brand')
    end
  end

  def index
    page_number = params[:page_number] || 1

    brands = Brand.approved

    if params[:country].present?
      brands = brands.where(country: params[:country])
    end

    brands = brands.order(:name).page(page_number)

    render json: brands

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
    @brand = Brand.friendly.find(params[:brand_id])
  end

  def brand_params
    params.require(:brand).permit(:name,:description,:country, :image_url)
  end
end
