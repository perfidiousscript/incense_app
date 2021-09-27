# == Schema Information
#
# Table name: incense_statistics
#
#  id             :uuid             not null, primary key
#  burn_time_avg  :float
#  burn_time_sd   :float
#  citrus_avg     :float
#  citrus_sd      :float
#  earthy_avg     :float
#  earthy_sd      :float
#  ethereal_avg   :float
#  ethereal_sd    :float
#  floral_avg     :float
#  floral_sd      :float
#  fruity_avg     :float
#  fruity_sd      :float
#  herbal_avg     :float
#  herbal_sd      :float
#  price_paid_avg :float
#  rating_avg     :float
#  savory_avg     :float
#  savory_sd      :float
#  smokey_avg     :float
#  smokey_sd      :float
#  spicy_avg      :float
#  spicy_sd       :float
#  sweet_avg      :float
#  sweet_sd       :float
#  woody_avg      :float
#  woody_sd       :float
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  incense_id     :uuid             not null
#
# Indexes
#
#  index_incense_statistics_on_incense_id  (incense_id)
#
# Foreign Keys
#
#  fk_rails_...  (incense_id => incenses.id)
#
class IncenseStatistic < ApplicationRecord
  belongs_to :incense
end
