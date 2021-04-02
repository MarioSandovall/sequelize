const sequelize = require('sequelize');
const { connection } = require('../db');

const User = connection.define('User', {
  uuid: {
    type: sequelize.UUID,
    primaryKey: true,
    defaultValue: sequelize.UUIDV4,
  },
  first: {
    type: sequelize.STRING,
    validate: {
      len: [3],
    },
  },
  last: sequelize.STRING,
  full_name: sequelize.STRING,
  bio: {
    type: sequelize.TEXT,
    validate: {
      contains: {
        args: ['bio'],
        msg: 'Error: Field must contain bio'
      },
    },
  }
}, {
  timestamps: true,
  hooks: {
    beforeValidate: () => {
      console.log('before validate');
    },
    afterValidate: () => {
      console.log('after validate');
    },
    beforeCreate: (user) => {
      user.full_name = `${user.first} ${user.last}`;
      console.log('before create');
    },
    afterCreate: () => {
      console.log('after create');
    }
  }
});

exports.User = User;