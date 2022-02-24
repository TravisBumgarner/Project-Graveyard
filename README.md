# Setup

1. Get .env credetials from GCP and populate into .env.gcp

# Resources:

https://www.youtube.com/watch?v=PKwu15ldZ7k
https://firebase.google.com/docs/auth/admin/errors
Very helpful for setting up cloud functions with cloud sql:
https://cloud.google.com/sql/docs/postgres/connect-functions

Will need SQL Auth Proxy running to use 
./cloud_sql_proxy -instances=core-incentive-342219:us-central1:myinstance=tcp:0.0.0.0:1234