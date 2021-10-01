
class Ability
  include CanCan::Ability

  def initialize(user)
    can [:current, :create, :show], User
    can [:show, :index], Brand
    can [:show, :index], Incense
    can [:show, :index], Ingredient
    can [:show, :index], Review
    if user.present?
      can [:show, :update], User, id: user.id
      can [:create], Brand
      can [:create], Incense
      can [:create, :update], Review, user_id: user.id
      can [:create, :update, :destroy], ReviewVote, user_id: user.id
      if user.moderator?
        can [:approve, :update], Brand
        can [:approve, :update], Incense
        can [:create, :update], Ingredient
        can [:index], Approval
      end
      if user.admin?
        can :manage, :all
      end
    end
  end
end
