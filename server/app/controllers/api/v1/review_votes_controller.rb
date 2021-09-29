class Api::V1::ReviewVotesController < Api::V1::BaseController
  before_action :require_login
  load_and_authorize_resource

  def create
    raise Errors::UnprocessableEntity.new('cannot create two review votes for the same review; update existing vote instead') if ReviewVote.find_by(user_id: current_user.id, review_id: review_vote_params[:review_id])
    new_review_vote_params = review_vote_params.merge(user_id: current_user.id)
    review_vote = ReviewVote.create(new_review_vote_params)

    if review_vote.valid?
      # Calculate here or elsewhere?
      render json: review_vote, status: :created
    else
      raise Errors::Validation.new('review vote', review_vote)
    end
  end


  def destroy
    review_vote = ReviewVote.find_by(user_id: current_user.id, id: params[:id])
    raise Error::NotFound if review_vote.nil?

    if review_vote.destroy!
      render :no_content
    else
      raise Error::Unexpected('cannot delete vote')
    end


  end

  private

  def review_vote_params
    params.require(:review_vote).permit(:review_id, :vote_type)
  end
end
