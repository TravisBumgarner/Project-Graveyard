# Local Setup

### Frontend

1. `npm install` dependencies

### Backend

1. Get `serviceAccountKey-[staging/production].json` from Firebase and put it in `src/middleware/` 
2. Copy environment variables from LassPass into each of the `.env` files.
3. `npm install` dependencies.

### Global

1. Install Docker
2. Run `npm run sd` from root to start app.

# Deployment

1. (Optional) If there are migrations...
  1. Start cloud-sql-proxy with `npm run cloudsql:[staging/production]`.
  2. Run migrations with `npm run migration:run:[staging/production]` 
2. Run `npm run deploy from root`

Notes

- `NODE_ENV` Has been set within Cloud Run.
  1. Click on Service
  2. Click on `EDIT & DEPLOY A NEW REVISION`
  3. Click on `VARIABLES & SECRETS`
  4. Add `NODE_ENV` = `production` or `staging`