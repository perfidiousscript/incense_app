require 'rails_helper'

RSpec.describe IncenseStatistics::Calculate do
  describe 'performs' do
    it 'works' do
      incense = create(:incense, :approved)
      create(:review, incense: incense, sweet: 2)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 4)

      calculation = IncenseStatistics::Calculate.call(incense)

      expect(calculation.success?).to be true
      expect(IncenseStatistic.count).to be(1)
      expect(IncenseStatistic.first[:sweet_avg]).to eq(3)
      expect(IncenseStatistic.first[:sweet_sd]).to eq(0.81)

    end
    it 'works with decimals' do
      incense = create(:incense, :approved)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 3)
      create(:review, incense: incense, sweet: 4)

      calculation = IncenseStatistics::Calculate.call(incense)

      expect(calculation.success?).to be true
      expect(IncenseStatistic.count).to be(1)
      expect(IncenseStatistic.first[:sweet_avg]).to eq(3.33)

    end
  end
end
