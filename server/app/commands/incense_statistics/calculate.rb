require 'descriptive_statistics/safe'
class IncenseStatistics::Calculate
  include Command

  def initialize(incense)
    @incense = incense
  end

  def call
    calculated_fields = %i|burn_time sweet smokey woody ethereal savory fruity herbal spicy citrus floral earthy|

    new_stats_hash = {}
    incense_statistic = IncenseStatistic.find_or_create_by(incense_id: @incense.id)
    reviews = Review.where(incense_id: @incense.id)

    new_stats_hash["price_paid_avg"] = DescriptiveStatistics.mean(reviews.pluck(:price_paid)).floor(2)
    new_stats_hash["rating_avg"] = DescriptiveStatistics.mean(reviews.pluck(:rating)).floor(2)

    calculated_fields.each do |field|
      new_stats_hash["#{field}_avg"] = DescriptiveStatistics.mean(reviews.pluck(field.to_sym)).floor(2)
      new_stats_hash["#{field}_sd"] = DescriptiveStatistics.standard_deviation(reviews.pluck(field.to_sym)).floor(2)
    end
    incense_statistic.update(new_stats_hash)
  end
end
