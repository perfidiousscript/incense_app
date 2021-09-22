
class Ability
  include CanCan::Ability

  def initialize(user)
    can [:current, :create], User
    can [:show, :index], Brand
    can [:show, :index], Incense
    can [:show, :index], Ingredient

    if user.present?
      can [:show, :update], User, id: user.id
      can [:create], Brand
      can [:create], Incense
      if user.moderator?
        can [:approve, :update], Brand
        can [:approve, :update], Incense
        can [:create, :update], Ingredient
      end
      if user.admin?
        can :manage, :all
      end
    end
  end
end
