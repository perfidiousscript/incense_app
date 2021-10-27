class Incense::Filter
  def filter(scope, query_params)
    # Fix this is the future to handle multiple includes_ingredients
    scope = scope.approved

    if query_params[:brand].present?
      scope = scope.joins(:brand).where("brands.slug ILIKE ? ", "#{query_params[:brand]}")
    end

    if query_params[:country].present?
      scope = scope.joins(:brand).where(brand: {country:query_params[:country]})
    end

    if query_params[:includes_ingredients].present?
      scope = scope.joins(:ingredients).where(ingredients: {id: query_params[:includes_ingredients]} )
    end

    scope
  end
end
