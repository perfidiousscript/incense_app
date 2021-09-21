
class Ability
  include CanCan::Ability

  def initialize(user)
    can [:current, :create], User
    can [:show, :index], Brand
    can [:show, :index], Incense

    if user.present?
      can [:show, :update], User, id: user.id
      can [:create], Brand
      can [:create], Incense
      if user.moderator?
        can [:approve, :update], Brand
        can [:approve, :update], Incense
      end
      if user.admin?
        can :manage, :all
      end
    end
  end
end
