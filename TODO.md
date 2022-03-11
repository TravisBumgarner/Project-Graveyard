# PR-5 

- [x] Add users page
- [x] Add friends relationship
- [x] Convert add worksheet to page
- [x] Add edit worksheet page
# Before first review with French teacher

- [ ] Add query/mutation for following/unfollowing and getting friends
- [ ] Disable recorder when recording is over
- [ ] Add ability to edit entries so you can add recordings later and such.
- [ ] Add error messages for login/signup
- [ ] Get rid of anys
- [ ] Add language dropdown
- [ ] Request a teacher
- [ ] Add a friend
- [ ] Testttssssss
- [ ] Add confirmation to form submitions, like ready for review.
- [ ] Fail if exists in FB but not Postgres
- [ ] Convert reviewer section to be need reviews, reviewed
- [ ] Get rid of tables for individual entries
- [ ] Be able to persist URLs after logging in .. redirect user
- [ ] Add a beta banner
- [ ] If graphql query fails, stop loading and throw error
- [ ] Get rid of modals, besides for confirmations on form submits
 # After First Review with French teacher

- [ ] Full styling cleanup
    - [x] Make navigation a dropdown at small screens
    - [x] Clean up all console errors
    - [x] Get rid of children in list with key 
    - [ ] standardize styling
    - [ ] Click everything
    - [ ] Get rid of style exploration, or at least hide route
- [ ] Only be able to edit your own work
- [ ] Update login emails, run through login, reset, signup flow
- [ ] figure a better way to handle service keys
- [ ] noImplicitAny issue
- [ ] Rework audio recorder to be more intuitive
    - [ ] add progress tracker and such
# Post MVP
- [ ] Export to flash card app
    - [ ] Be able to choose what to export
- [ ] Figure out modifying the express.Request type
- [ ] Include reference to icons
- [ ] Analytics

# Done

- [x] Record sentences
- [x] For each call to mutation, check if response is id (or some other value) or null. And handle accordingly
- [x] Double submit Worksheet creation bug
- [x] Give way to delete new worksheets
- [x] After filling out an assignment and submitting it, the new phrases don't show in the pending review section
- [x] Throw error if response from graphql is null
- [x] Display date after worksheet submitted. Add column for date created, date submitted, etc.
- [x] Delete worksheets in firebase
- [x] add the idea of users
    - [x] Need some way for students to share with teachers
    - [x] Need way for teachers to give feedback
    - [x] Setup a new auth for production for Firebase auth so that it doesn't clash with development
- [ ] ~~Setup way to deploy infra as code for GCP~~
- [x] Firebase for production
    - [x] Create a new project
        - [x] Remove localhost
- [x] Cleanup local envs
- [x] Setup domain
- [x] Set config of apollo, etc. for prod
- [x] ~~Add edit for WorksheetEntry~~
- [x] Make sure that sentry is actually logging
- [x] create a style
- [x] Remove uneeded code
- [x] Add more fields for worksheet
    - [x] I speak _____ and I am learning _______ 
    - [x] Use ^ these fields to generate UI for worksheetentry
    - [x] For Example - Written in English, Written in French, Pronounced in French
- [x] Setup for Postgres instead of SQLlite
- [x] Figure out how to record and save audio
- [x] Add user login
    - [x] With firebase?
- [x] Add homepage instructions
- [x] Don't use admin postgres to connect to GCP SQL
- [x] Do I want a private IP with GCP SQL? I might need an organization to do it, whatever that means
- [x] Bare minimum of usable UI
- [x] Figure out file hosting
- [x] Figure out deployment
    - [x] Get an api endpoint for backend and add to frontend webpack config for calls
    - [x] why is null being returned for all data via graphql with gcp
    - [x] Setup cors
    - [x] Figure out 8mb deploy bundle
- [x] Figure out .dotenv on frontend
- [x] add testing and linting
- [x] Find some beta testers
- [x] Add logging
- [x] is the shouldPermit util a good idea?
- [x] Get username displayed on the screen
- [x] Figure out how to do migrations outside/inside a container. (.env points to different localhost then where migrations are run)
- [x] Fix page refresh always redirecting people to login
- [x] Figure out broken date picker (or just hide date picker and have date created be set)
- [x] https://medium.com/@HurricaneJames/graphql-mutations-fb3ad5ae73c4
- [x] https://atheros.ai/blog/input-object-type-as-an-argument-for-graphql-mutations-and-queries
- [x] Add a way to give a review
- [x] Does global context make sense? Maybe requests should be made on page load instead
- [x] Page refresh on Worksheet page and review worksheet page is broken
- [x] How to handle types with GraphQL?
    - https://www.apollographql.com/docs/apollo-server/data/resolvers/
- [x] Get rid of || 'foobar'
- [x] Add eslint
- [x] Add backend monitoring
- [x] Disable buttons when submitting
- [x] Animate loading
- [x] Figure out some kind of alert for actions
- [x] Give names to docker containers


# New Features IDeas

- Add ability to pick native language
