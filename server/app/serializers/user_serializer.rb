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
#  slug               :string
#  username           :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_users_on_email           (email) UNIQUE
#  index_users_on_remember_token  (remember_token)
#  index_users_on_slug            (slug) UNIQUE
#  index_users_on_username        (username) UNIQUE
#
class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :role

  has_many :reviews
end
