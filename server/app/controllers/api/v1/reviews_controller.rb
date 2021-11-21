class Api::V1::ReviewsController < Api::V1::BaseController
  before_action :require_login, only: [:create, :update]
  before_action :find_incense, only: [:create]
  load_and_authorize_resource

  def create
    raise Errors::UnprocessableEntity.new('cannot create two reviews for the same incense, update existing review instead') if Review.find_by(user_id: current_user.id, incense_id: @incense.id)
    new_review_params = review_params.merge(user_id: current_user.id, incense_id: @incense.id)

    review = Review.create(new_review_params)

    if review.valid?
      ReviewRanking.create(review: review)
      IncenseStatistics::Calculate.call(review.incense)
      render json: review, status: :created
    else
      raise Errors::Validation.new('review', review)
    end

  end

  def update
    review = Review.find_by(user_id: current_user.id, id: params[:id])

    raise Errors::NotFound.new('review') if review == nil

    if review.update(review_params)
      IncenseStatistics::Calculate.call(review.incense)
      render json: review
    else
      raise Errors::Validation.new('cart', review)
    end
  end

  def show
    review = Review.find(params[:id])

    if review != nil
      render json: review
    else
      raise Errors::NotFound.new('review')
    end
  end

  def index

  end

  private

  def review_params
    params.require(:review).permit(:incense_slug,
                                   :review_body,
                                   :rating,
                                   :price_paid,
                                   :sweet,
                                   :smokey,
                                   :woody,
                                   :ethereal,
                                   :savory,
                                   :fruity,
                                   :herbal,
                                   :spicy,
                                   :citrus,
                                   :floral,
                                   :earthy,
                                   :burn_time,
                                   :year_purchased
                                 )
  end

  def find_incense
    @incense = Incense.friendly.find(params[:incense_slug])
  end
end
