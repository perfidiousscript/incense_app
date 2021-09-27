class Api::V1::IncensesController < Api::V1::BaseController
  before_action :require_login, except: [:show, :index]
  before_action :find_incense, only: [:show, :approve, :update]
  load_and_authorize_resource

  # We allow users without credentials to create unapproved incenses.
  # Mods and admins create inceses which are approved by them.
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
      raise Errors::Validation.new('incense', incense)
    end
  end

  def update
    if @incense != nil
      @incense.update(incense_params)
      if @incense.valid?
        render json: @incense, status: :ok
      else
        Errors::Validation.new('incense', @incense)
      end
    else
      raise Errors::NotFound.new('incense')
    end
  end

  def show
    if @incense != nil
      unless @incense.approved?
        raise Errors::NotFound.new('incense') unless current_user && (current_user.moderator? || current_user.admin?)
      end

      render json: @incense
    else
      raise Errors::NotFound.new('incense')
    end
  end

  def index
    page_number = params[:page_number] || 1

    incenses = Incense.approved

    if params[:brand_id].present?
      incenses = incenses.where(brand: params[:brand_id].split(','))
    end

    if params[:country].present?
      incenses = incenses.joins(:brand).where(brand: {country: params[:country].split(',')})
    end

    if params[:includes_ingredient_ids].present?
      incenses = incenses.joins(:ingredients).where(ingredients: {id: params[:includes_ingredient_ids].split(',')})
    end

    if params[:excludes_ingredient_ids].present?
      # Attempt at running everything via SQL
      # incenses = incenses.and(Incense.approved.joins(:ingredients).where.not(ingredients: {id: params[:excludes_ingredient_ids].split(',')}))
      incenses = incenses.order(:name) - Incense.approved.joins(:ingredients).where(ingredients: {id: params[:excludes_ingredient_ids].split(',')})
      incenses = Kaminari.paginate_array(incenses).page(page_number)
      render json: incenses
    else
      incenses = incenses.order(:name).page(page_number)
      render json: incenses
    end
  end

  def approve
    @incense.update({approved_by_id: current_user.id})

    if @incense.valid?
      render json: @brand, status: :ok
    else
      raise Errors::UnprocessableEntity.new('could not approve incense')
    end
  end

  private

  def find_incense
    @incense = Incense.includes(:ingredients).find_by_id(params[:incense_id])
  end

  def incense_params
    params.require(:incense).permit(:name,:brand_id,:description,:image_url)
  end

  def serializer_includes
    [:ingredients]
  end
end
