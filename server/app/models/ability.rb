
class Ability
  include CanCan::Ability

  def initialize(user)
    can [:current, :create], User
    can [:show, :index], Brand

    if user.present?
      can [:show, :update], User, id: user.id
      can [:create], Brand
      if user.moderator?
      end
      if user.admin?
        can :manage, :all
      end
    end
  end
end
