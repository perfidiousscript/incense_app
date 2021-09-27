# == Schema Information
#
# Table name: users
#
#  id                 :uuid             not null, primary key
#  confirmation_token :string(128)
#  disabled_at        :datetime
#  email              :string           not null
#  encrypted_password :string(128)
#  remember_token     :string(128)
#  role               :integer          default("user"), not null
#  username           :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_users_on_email           (email) UNIQUE
#  index_users_on_remember_token  (remember_token)
#  index_users_on_username        (username) UNIQUE
#
class User < ApplicationRecord
  include Clearance::User
  has_many :reviews

  enum role: [:user, :moderator, :admin]

  validates :username, :email, presence: true
  validates :username, :email, uniqueness: true

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role, inclusion: { in: roles.keys, message: :invalid }
end
