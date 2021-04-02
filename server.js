const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { connection } = require('./db');
const { Account } = require('./models/account');
const { User } = require('./models/user');
const ACCOUNTS = require('./accounts.json');
const { where } = require('sequelize');

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
    });
    Account.bulkCreate(ACCOUNTS)
      .then(accounts => {
        console.log('Success adding accounts');
      })
      .catch(error => {
        console.log(error);
      });
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

app.get('/account', (req, res) => {
  Account.findAll({
    where: {
      name: {
        [Op.like]: '%a%'
      }
    }
  })
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get('/account/:id', (req, res) => {
  const id = req.params.id;
  Account.findByPk(id)
    .then((account) => {
      res.json(account);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.delete('/account/:id', (req, res) => {
  const id = req.params.id;
  Account.destroy({ where: { id } })
    .then(() => {
      res.json('Account successfuly deleted');
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.put('/account/:id', (req, res) => {
  const id = req.params.id;
  const account = {
    name: 'Mario Sandoval',
    password: 'holi12345',
  }

  Account.update(account,
    { where: { id } })
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.post('/post', (req, res) => {
  const newAccount = req.body.account;

  Account.create({
    name: newAccount.name,
    email: newAccount.email
  })
    .then((account) => {
      res.json(account);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});



app.listen(port, () => {
  console.log('Running server on port ' + port);
});
