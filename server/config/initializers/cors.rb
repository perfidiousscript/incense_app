Rails.application.config.middleware.insert_before 0, Rack::Cors do
  if Rails.env.development?
    allow do
      origins 'localhost:3000', '127.0.0.1:3000'
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end
  end
  # if Rails.env.production?
  #   allow do
  #     origins 'gentleguide.vercel.app', 'https://www.gentle.guide'
  #     resource '*',
  #       headers: :any,
  #       methods: [:get, :post, :put, :patch, :delete, :options, :head],
  #       credentials: true
  #   end
  # end
end
