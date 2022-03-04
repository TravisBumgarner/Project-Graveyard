# Today

- [ ] Figure out why node is crashing (see dump below)
- [ ] https://medium.com/@HurricaneJames/graphql-mutations-fb3ad5ae73c4
- [ ] https://atheros.ai/blog/input-object-type-as-an-argument-for-graphql-mutations-and-queries
- [ ] Why is database getting deleted 
    - `postgres_1  | 2022-03-02 02:34:42.241 UTC [98] LOG:  incomplete startup packet` might be causing postgres to get wiped
    - Probably because I keep force quitting with postico open?
- [x] Get username displayed on the screen
- [ ] Add a way to give a review
- [x] Figure out how to do migrations outside/inside a container. (.env points to different localhost then where migrations are run)
- [x] Fix page refresh always redirecting people to login
- [x] Figure out broken date picker (or just hide date picker and have date created be set)
- [ ] Does global context make sense? Maybe requests should be made on page load instead
- [ ] Page refresh on Worksheet page and review worksheet page is broken
- [ ] How to handle types with GraphQL?
    - https://www.apollographql.com/docs/apollo-server/data/resolvers/
- [ ] Get rid of || 'foobar'
- [ ] Disable buttons when submitting

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


# New Features IDeas

- Add ability to pick native language


```
help-speaking-backend-1   | Compilation error in /app/backend/src/schemas/mutations.ts
help-speaking-backend-1   | {"_queryType":"Query","_mutationType":"Mutation","_directives":["@include","@skip","@deprecated","@specifiedBy"],"_typeMap":{"Query":"Query","Worksheet":"Worksheet","String":"String","User":"User","Boolean":"Boolean","WorksheetEntry":"WorksheetEntry","Mutation":"Mutation","Review":"Review","ReviewEntry":"ReviewEntry","__Schema":"__Schema","__Type":"__Type","__TypeKind":"__TypeKind","__Field":"__Field","__InputValue":"__InputValue","__EnumValue":"__EnumValue","__Directive":"__Directive","__DirectiveLocation":"__DirectiveLocation"},"_subTypeMap":{},"_implementationsMap":{}}
help-speaking-backend-1   | App listening at http://0.0.0.0:5001
help-speaking-backend-1   | [INFO] 03:52:09 Restarting: /app/backend/src/schemas/mutations.ts has been modified
help-speaking-backend-1   | Compilation error in /app/backend/src/schemas/mutations.ts
help-speaking-backend-1   | 
help-speaking-backend-1   | <--- Last few GCs --->
help-speaking-backend-1   | 
help-speaking-backend-1   | [19:0x127a2af0]   967688 ms: Mark-sweep (reduce) 991.7 (1011.8) -> 991.0 (1012.1) MB, 292.3 / 0.0 ms  (average mu = 0.328, current mu = 0.076) allocation failure scavenge might not succeed
help-speaking-backend-1   | [19:0x127a2af0]   968011 ms: Mark-sweep (reduce) 992.3 (1012.3) -> 991.3 (1012.8) MB, 320.0 / 0.0 ms  (average mu = 0.193, current mu = 0.009) allocation failure scavenge might not succeed
help-speaking-backend-1   | 
help-speaking-backend-1   | 
help-speaking-backend-1   | <--- JS stacktrace --->
help-speaking-backend-1   | 
help-speaking-backend-1   | FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
help-speaking-backend-1   |  1: 0xaf9c78 node::Abort() [node]
help-speaking-backend-1   |  2: 0xa21a88 node::FatalError(char const*, char const*) [node]
help-speaking-backend-1   |  3: 0xccdec8 v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
help-speaking-backend-1   |  4: 0xcce054 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
help-speaking-backend-1   |  5: 0xe7bc30 v8::internal::Heap::EnsureFromSpaceIsCommitted() [node]
help-speaking-backend-1   |  6: 0xe8af70 v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [node]
help-speaking-backend-1   |  7: 0xe8da6c v8::internal::Heap::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [node]
help-speaking-backend-1   |  8: 0xe53138 v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationType, v8::internal::AllocationOrigin) [node]
help-speaking-backend-1   |  9: 0x11a1f2c v8::internal::Runtime_AllocateInYoungGeneration(int, unsigned long*, v8::internal::Isolate*) [node]
help-speaking-backend-1   | 10: 0x155082c  [node]
help-speaking-backend-1   | Aborted
help-speaking-backend-1 exited with code 134
```