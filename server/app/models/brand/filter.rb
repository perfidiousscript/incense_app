class Brand::Filter
  def filter(scope, query_params)
    scope = scope.approved

    if query_params[:country].present?
      scope = scope.where(country: query_params[:country])
    end

    if query_params[:name].present?
      scope = scope.where("brands.name ILIKE ? ", "#{query_params[:name]}%")
    end

    scope
  end
end
