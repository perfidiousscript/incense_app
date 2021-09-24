class IncenseStatistics::Calculate
  include Command

  def initialize(incense)
    @incense = incense
  end

  def call
    calculated_fields = %i|rating price_paid burn_time sweet smokey woody ethereal savory fruity herbal spicy citrus floral earthy|

    new_stats_hash = {}
    incense_statistic = IncenseStatistic.find_or_create_by(incense_id: @incense.id)
    reviews = Review.where(incense_id: @incense.id)
    calculated_fields.each do |field|

      new_stats_hash["#{field}_avg"] = reviews.average(field).floor(2)
    end
    incense_statistic.update(new_stats_hash)
  end
end
