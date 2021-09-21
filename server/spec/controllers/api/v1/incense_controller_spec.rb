require 'rails_helper'

RSpec.describe Api::V1::IncensesController, type: :controller do
  incense_params_list = %i(name,brand,description,image_url)

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe 'Create New Incense' do
    describe 'as a basic user' do
      it 'should create an unapproved incense'do
        user = create(:user)
        brand = create(:brand, :approved)
        incense = build(:incense)

        sign_in_as user
        post :create, params: {
          incense: {
            name: incense.name,
            description: incense.description,
            image_url: incense.image_url,
            brand_id: brand.id
          }
        }

        assert_response :created
        expect(Incense.count).to eq 1
        expect(Incense.first.approved?).to eq false
      end
    end
  end

end
