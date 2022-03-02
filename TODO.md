# Today

- [ ] https://medium.com/@HurricaneJames/graphql-mutations-fb3ad5ae73c4
- [ ] https://atheros.ai/blog/input-object-type-as-an-argument-for-graphql-mutations-and-queries
- [ ] ~~Why is database getting deleted ~~
    - Probably because I keep force quitting with postico open?
- [x] Get username displayed on the screen
- [ ] Add a way to give a review
- [x] Figure out how to do migrations outside/inside a container. (.env points to different localhost then where migrations are run)
- [ ] Fix page refresh always redirecting people to login
- [x] Figure out broken date picker (or just hide date picker and have date created be set)
- [ ] Does global context make sense? Maybe requests should be made on page load instead
- [ ] How to handle types with GraphQL?
    - https://www.apollographql.com/docs/apollo-server/data/resolvers/

# MVP

- [x] Remove uneeded code
- [ ] ~~Add edit for WorksheetEntry~~
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
- [x] add the idea of users
    - [ ] Only be able to edit your own work
    - [ ] Need some way for students to share with teachers
    - [ ] Need way for teachers to give feedback
- [ ] Bare minimum of usable UI
- [ ] Diagram the GCP system and get Alan's / James's feedback
- [ ] Figure out file hosting
- [ ] Figure out deployment
    - [x] Get an api endpoint for backend and add to frontend webpack config for calls
    - [ ] why is null being returned for all data via graphql with gcp
    - [ ] Setup cors
    - [ ] Figure out 8mb deploy bundle
    - [ ] Setup a new auth for production for Firebase auth so that it doesn't clash with development
- [ ] Setup way to deploy infra as code for GCP
# Post MVP

- [ ] create a style
- [ ] Figure out .dotenv on frontend
- [ ] Export to flash card app
    - [ ] Be able to choose what to export
- [ ] add testing and linting
- [ ] Find some beta testers
- [ ] Firebase for production
    - [ ] Create a new project
        - [ ] Remove localhost
- [ ] Add logging
- [ ] Figure out modifying the express.Request type
- [ ] is the shouldPermit util a good idea?
- [ ] Include reference to icons
