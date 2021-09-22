class Api::V1::IngredientsController < Api::V1::BaseController
  before_action :require_login, only: [:create, :update]
  load_and_authorize_resource

  def create
    ingredient = Ingredient.create(ingredient_params)

    if ingredient.success?
      render json: ingredient, status: created
    end
  end

  def update
  end

  def show
  end

  def index
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name, :description, :image_url)
  end
end
