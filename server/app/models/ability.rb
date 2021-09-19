
class Ability
  include CanCan::Ability

  def initialize(user)
    can [:current, :create], User

    if user.present?
      can [:show, :update], User, id: user.id
      if user.admin?
        can :manage, :all
      end
    end
  end
end
