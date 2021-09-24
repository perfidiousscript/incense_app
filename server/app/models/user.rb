class User < ApplicationRecord
  include Clearance::User
  has_many :reviews

  enum role: [:user, :moderator, :admin]

  validates :username, :email, presence: true
  validates :username, :email, uniqueness: true

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role, inclusion: { in: roles.keys, message: :invalid }
end
