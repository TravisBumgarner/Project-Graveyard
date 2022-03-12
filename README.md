# Setup

1. Get .env credetials from GCP and populate into .env.gcp


# Production Deploy

gcloud config set project   worksheets-9b1ad
1. Get `serviceAccountKey.json` into `/backend/src/middleware/serviceAccountKey.json
  ./cloud_sql_proxy -instances=worksheets-9b1ad:us-central1:worksheets=tcp:0.0.0.0:1234

### Backend

gcloud run services update backend --add-cloudsql-instances=us-central1:phreaseaday-staging



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
./cloud_sql_proxy -instances=phraseaday-staging:us-central1:phreaseaday-staging=tcp:0.0.0.0:1234


# Adding a Cloud SQL Database

1. Select GCP Project 
2. Create Database
3. Add Database in Cloud Run 
    - It'll give a popup for Cloud SQL Admin to enable that, do it

Notes, might need to figure out how to get NODE_ENV into dockerfile because of sd:be


# Initial DB Setup

1. Run cloud_sql to connect to db.
2. Use  Postico to login to DB
3. Add postgres `phraseaday`
4. Now you can run migrations against database from local with env vars in `.env.gcp-proxy-migrations`

# DB Migrations

1. Run staging (`npm run cloudsql:staging`) or production (`npm run cloudsql:production`) cloudsql
2. Update username/password in `.env.gcp-proxy-migrations` for either staging or prod
3. `npm run migration:run:gcp-sql-proxy`