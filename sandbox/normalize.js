const resp = {
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
};

const normalizer = require('normalizr');
const {
  normalize,
  schema
} = normalizer;

// // Define a users schema
// const user = new schema.Entity('users');
//
// // Define your comments schema
// const comment = new schema.Entity('comments', {
//   commenter: user
// });
//
// // Define your article
// const article = new schema.Entity('articles', {
//   authorID: user,
//   comments: [comment]
// });
//
// const normalizedData = normalize(resp, article);
//
// console.log(normalizedData);

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
  commenter: user,
})

const article = new schema.Entity('articles', {
  authorID: user,
  comments: [comment],
});

const normalizedData = normalize(resp, article);

