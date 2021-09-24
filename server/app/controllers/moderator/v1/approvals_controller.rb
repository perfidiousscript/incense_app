class Moderator::V1::ApprovalsController < Api::V1::BaseController
  load_and_authorize_resource

  def index
    pending_brands = Brand.pending_approval
    pending_incenses = Incense.pending_approval

    render json: {
      pending_brand_approvals: pending_brands,
      pending_incense_approvals: pending_incenses
    }, status: :ok
  end
end
