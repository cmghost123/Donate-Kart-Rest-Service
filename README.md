# Donate-Kart-Rest-Service

Donate-Kart Rest Services Assignment

Api Endpoints:

1. "/api/campaigns/"
   -> to get all campaigns.

2. /api/campaigns/sort"
   -> By default gets all campaigns sorted wrt totalAmount in descending order.
   -> Excepts 2 query parameters:
   key={keyToSort} and order={ascending/descending}
   keyToSort can be totalAmount, categoryId, daysLeft (NOTE: Not fully supported for all keys yet.)
   example : localhost:8080/api/campaigns/sort?key=totalAmount&order=ascending

3. "/api/campaigns/active"
   -> Gets active campaigns that are created within the last 1 month and considers campaign active only if the end date is greater
   than or equal to today.

4. "/api/campaigns/inActive:
   -> Gets all campaigns i.e closed. If the end date is less than today, or procured amount is greater than or equal to total amount
   we consider the campaign as inactive.

5. "/api/campaigns/ngCode/{ngoCode}"
   -> Gets specific capmaign passsed using ngoCode in path.
