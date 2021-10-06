class Incense::Filter
  def filter(scope, query_params)

    scope = scope.approved

    if query_params[:brand].present?
      scope = scope.joins(:brand).where(brand: {slug: query_params[:brand].split(',')})
    end

    if query_params[:country].present?
      scope = scope.joins(:brand).where(brand: {country:query_params[:country].split(',')})
    end

    if query_params[:includes_ingredient].present?
      scope = scope.joins(:ingredients).where(ingredients: {id: query_params[:includes_ingredient].split(',')})
    end

    scope
  end
end
