const sequelize = require('sequelize');
const { connection } = require('../db');

const User = connection.define('User', {
  uuid: {
    type: sequelize.UUID,
    primaryKey: true,
    defaultValue: sequelize.UUIDV4,
  },
  name: sequelize.STRING,
  bio: sequelize.TEXT,
});

exports.User = User;