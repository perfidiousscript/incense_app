require 'rails_helper'

RSpec.describe Moderator::V1::ApprovalsController, type: :controller do

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'index approvals' do
    it 'errors if user is not a mod' do
      user = create(:user)
      create(:brand)

      sign_in_as user

      get :index

      assert_response :forbidden
    end

    it 'returns pending approvals' do
      moderator = create(:user, :moderator)
      pending_brand = create(:brand)
      approved_brand = create(:brand, :approved)
      pending_incense = create(:incense, brand: approved_brand)
      approved_incense = create(:incense, :approved, brand: approved_brand)


      sign_in_as moderator

      get :index

      assert_response :ok
      expect(json[:pending_brand_approvals].length).to eq(1)
      expect(json[:pending_brand_approvals][0]['id']).to eq(pending_brand.id)
      expect(json[:pending_incense_approvals].length).to eq(1)
      expect(json[:pending_incense_approvals][0]['id']).to eq(pending_incense.id)
    end
  end
end
