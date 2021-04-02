const express = require('express');
const { connection } = require('./db');
const { User } = require('./models/user');

connection
  .sync({
    logging: console.log,
    force: true
  })
  .then(() => {
    User.create({
      first: 'Mario',
      last: 'Sandoval',
      bio: 'New bio entry'
    })
  })
  .then(() => {
    console.log('connection to database established successfully');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ' + error);
  });

const port = 8001;
const app = express();

app.get('/', (req, res) => {
  User.create({
    first: 'Mario',
    last: 'Sandoval',
    bio: 'New bio entry'
  })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.listen(port, () => {
  console.log('Running server on port ' + port);
});
