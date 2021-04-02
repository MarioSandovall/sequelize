const Sequelize = require('sequelize');
const { connection } = require('../db');

const Project = require('./project');

const User = connection.define('User', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  },
  first: {
    type: Sequelize.STRING,
    validate: {
      len: [3],
    },
  },
  last: Sequelize.STRING,
  full_name: Sequelize.STRING,
  bio: {
    type: Sequelize.TEXT,
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

// Creates a UserProjects table with Ids for ProjectId and UserId
User.belongsToMany(Project, { as: 'Tasks', through: 'UserProjects' });
Project.belongsToMany(User, { as: 'Workers', through: 'UserProjects' });

module.exports = User;