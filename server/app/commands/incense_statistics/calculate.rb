class IncenseStatistics::Calculate
  include Command

  calculated_fields = %i|rating price_paid burn_time sweet smokey woody ethereal savory fruity herbal spicy citrus floral|

  def initialize(incense)
    @incense = incense
  end

  def calls
    new_stats_hash = {}
    incense_statistics = IncenseStatistics.find_by_incense_id(incense_id)
    reviews = Review.where(incense_id: incense.id)
    calculated_fields.each do |field|
      new_stats_hash[`#{field}_avg`] = reviews.average(field)
    end
    incense_statisics.update(new_stats_hash)
  end
end
