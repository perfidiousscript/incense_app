module Command
  extend ActiveSupport::Concern

  included do
    prepend SimpleCommand
    include ActiveModel::Validations
  end
end
