const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { connection } = require('./db');
const ACCOUNTS = require('./accounts.json');

const Account = require('./models/account');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const Project = require('./models/project');

connection
  .sync({
    logging: console.log,
    force: true
  })
  .then(async () => {
    await Account.bulkCreate(ACCOUNTS);

    const firstUser = await User.create({
      first: 'Mario',
      last: 'Sandoval',
      bio: 'New bio entry'
    });

    const secodUser = await User.create({
      first: 'Ruben',
      last: 'Hernandez',
      bio: 'New bio entry'
    });

    const post = await Post.create({
      userId: firstUser.id,
      title: 'Fist Post',
      content: 'post content 1',
    });

    for (let i = 1; i <= 3; i++) {
      await Comment.create({
        postId: post.id,
        the_comment: 'Comment ' + i,
      });
    }

    const project = await Project.create(
      { title: 'Project 1' }
    );

    project.setWorkers([firstUser.id, secodUser.id]);

    await Project.create(
      { title: 'Project 2' }
    );

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

app.get('/post', (req, res) => {
  Post.findAll({
    include: [{
      as: 'userRef',
      model: User,
    }]
  })
    .then((posts) => {
      res.json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

app.get('/post/:id', (req, res) => {
  const id = req.params.id;
  Post.findByPk(id, {
    include: [{
      as: 'all_comments',
      model: Comment,
      attributes: ['the_comment'],
    }]
  })
    .then((post) => {
      res.json(post);
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
