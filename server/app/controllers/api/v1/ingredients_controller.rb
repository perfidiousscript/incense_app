class Api::V1::IngredientsController < Api::V1::BaseController
  before_action :require_login, only: [:create, :update]
  load_and_authorize_resource :find_by => :slug

  def create
    ingredient = Ingredient.create(ingredient_params)

    if ingredient.valid?
      render json: ingredient, status: :created
    else
      raise Errors::Validation.new('ingredient', ingredient)
    end
  end

  def update
    ingredient = Ingredient.friendly.find(params[:slug])

    raise Errors::NotFound.new('ingredient') if ingredient.nil?

    ingredient.update(ingredient_params)

    if ingredient.valid?
      render json: ingredient, status: :ok
    else
      raise Errors::Validation.new('ingredient', ingredient)
    end
  end

  def show
    ingredient = Ingredient.friendly.find(params[:slug])

    unless ingredient == nil
      render json: ingredient
    else
      raise Errors::NotFound.new('ingredient')
    end
  end

  def index
    ingredients = Ingredient.all.order(:name)

    render json: ingredients
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name, :description, :image_url)
  end
end
