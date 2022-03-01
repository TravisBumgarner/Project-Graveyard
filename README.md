# Setup

1. Get .env credetials from GCP and populate into .env.gcp


# Production Deploy

gcloud config set project   worksheets-9b1ad
1. Get `serviceAccountKey.json` into `/backend/src/middleware/serviceAccountKey.json
  ./cloud_sql_proxy -instances=worksheets-9b1ad:us-central1:worksheets=tcp:0.0.0.0:1234

### Backend

gcloud run services update backend --add-cloudsql-instances=worksheets-9b1ad:us-central1:worksheets

##### Migrations

- Make sure that IP address is listed under Connections -> Authorized Networks in GCP Cloud SQP

### Frontend

npm run deploy

### Auth

Firebase auth


# Local Setup

From root: `npm run sd`




# Resources:

https://www.youtube.com/watch?v=PKwu15ldZ7k
https://firebase.google.com/docs/auth/admin/errors
Very helpful for setting up cloud functions with cloud sql:
https://cloud.google.com/sql/docs/postgres/connect-functions

Will need SQL Auth Proxy running to use 
./cloud_sql_proxy -instances=core-incentive-342219:us-central1:myinstance=tcp:0.0.0.0:1234