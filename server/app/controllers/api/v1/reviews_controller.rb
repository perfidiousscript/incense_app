class Api::V1::ReviewsController < Api::V1::BaseController
  before_action :require_login, only: [:create, :update]
  load_and_authorize_resource

  def create
    new_review_params = review_params.merge(user_id: current_user.id)
    review = Review.create(new_review_params)

    if review.valid?
      render json: review, status: :created
    else
      raise Errors::Validation.new('review', review)
    end

  end

  def update
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
    params.require(:review).permit(:incense_id,
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
                                   :burn_time,
                                   :year_purchased
                                 )
  end
end
