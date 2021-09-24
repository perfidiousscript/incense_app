require 'rails_helper'

RSpec.describe IncenseStatistics::Calculate do
  describe 'performs' do
    fit 'works' do
      incense = create(:incense, :approved)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 3)

      calculation = IncenseStatistics::Calculate.call(incense)

      expect(calculation.success?).to be true
      #add more specs to check results here

    end
  end

end
