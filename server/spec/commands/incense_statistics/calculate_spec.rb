require 'rails_helper'

RSpec.describe IncenseStatistics::Calculate do
  describe 'performs' do
    it 'works' do
      incense = create(:incense, :approved)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 3)

      calculation = IncenseStatistics::Calculate.call(incense)

      expect(calculation.success?).to be true
      expect(IncenseStatistic.count).to be(1)
      expect(IncenseStatistic.first[:sweet_avg]).to be(3)

    end
  end

end
