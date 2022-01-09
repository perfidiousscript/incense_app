class Api::V1::IncensesController < Api::V1::BaseController
  before_action :require_login, except: [:show, :index]
  load_and_authorize_resource :find_by => :slug, except: :create
  authorize_resource only: :create

  # We allow users without credentials to create unapproved incenses.
  # Mods and admins create inceses which are approved by them.
  def create
    ip = incense_params
    unless ip[:ingredient_ids] == nil
      ingredient_ids_array = JSON.parse!(ip[:ingredient_ids])
      validate_ingredient_ids!(ingredient_ids_array)
      ip["ingredient_ids"]= ingredient_ids_array
    end

    if current_user.moderator? || current_user.admin?
      incense = Incense.create(ip.merge({approved_by_id: current_user.id}))
    else
      incense = Incense.create(ip)
    end

    if incense.valid?
      render json: incense, status: :created
    else
      raise Errors::Validation.new('incense', incense)
    end
  end

  def update
    incense = Incense.friendly.find(params[:slug])
    if incense != nil
      incense.update(incense_params)
      if incense.valid?
        render json: incense, status: :ok
      else
        Errors::Validation.new('incense', incense)
      end
    else
      raise Errors::NotFound.new('incense')
    end
  end

  def show
    incense = Incense.includes(:ingredients, :incense_statistic, reviews: :review_ranking).friendly.find(params[:slug])
    if incense != nil
      unless incense.approved?
        raise Errors::NotFound.new('incense') unless current_user && (current_user.moderator? || current_user.admin?)
      end

      render json: incense, include: ['ingredients','reviews.review_ranking', 'incense_statistic']

    else
      raise Errors::NotFound.new('incense')
    end
  end

  def index
    page_number = query_params[:page_number] || 1

    incenses = Incense.filtered(query_params).distinct

    if query_params[:excludes_ingredients].present?
      incenses = incenses.order(:name) - Incense.approved.joins(:ingredients).where(ingredients: {id: query_params[:excludes_ingredients]})
      incenses = Kaminari.paginate_array(incenses).page(page_number)
    else
      incenses = incenses.order(:name).page(page_number)
    end

    render json: incenses
  end

  def approve
    incense = Incense.friendly.find(params[:incense_slug])
    incense.update({approved_by_id: current_user.id})

    if incense.valid?
      render json: incense, status: :ok
    else
      raise Errors::UnprocessableEntity.new('could not approve incense')
    end
  end

  private

  def incense_params
    params.require(:incense).permit(:name,:brand_id,:description,:image, :ingredient_ids)
  end

  def query_params
    params.permit(:name, :brand, :country, :page_number, :includes_ingredients , :excludes_ingredients)
  end

  def validate_ingredient_ids!(ingredient_ids_array)
    invalid_ids = ingredient_ids_array - Ingredient.where(id: ingredient_ids_array).ids
    unless invalid_ids.empty?
      error = Errors::Validation.new('ingredient')
      invalid_ids.each do |invalid_id|
         error.errors.add("ingredient_id: #{invalid_id}", "invalid")
       end
       raise error
    end
  end

end
