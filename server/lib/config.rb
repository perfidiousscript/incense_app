class Config
  class << self
    def env
      Rails.application.credentials[Rails.env.to_sym]
    end
  end
end
