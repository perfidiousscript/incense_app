class Distance < ApplicationRecord
# Distance records the euclidian distance between the 11 dimensional
# co-ordiantes comprised be each incense statistic. This will allow us
# to get an idea of which incenses are similar.

# Distance will take two Incense Id's (the incenses whose distances are being measured)
# the distance itself and timestamps.

# A chron job will run once a week or once a month. It will iterate over all incenses
# if an incense has had at least five new reviews since the last Distance update the
# distance update will run on this incense (I1). (This distance update is run only after each five reviews
# ,starting at five, because we are comparing averages, and can expect the average incense
# statistic to only be meaningful after five reviews have been posted, and to change in a meaningful
# way only after five more have been added.)

# The script will then iterate through all incenses with at least 5 reviews,
# measuring the euclidian distance between the incense statistic of I1 and the
# incense which is being iterated over. The Distance will be updated with the new distance
# and the current timestamp.

# Closest Incenses could be measured either as a top 5/ top 3 thing or, we could
# measure the mean and sd of all distances and only return those that are 2sd below the mean,
# that is to say: only those distance which are unusually small. This could probably be
# handled nicely by a scope, though where we would store the mean and SD is hard to tell,
# maybe in redis, or maybe in a dedicated SQL table or model or something.
end
