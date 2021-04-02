const Sequelize = require('sequelize');
const { connection } = require('../db');

const Comment = connection.define('Comment', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  the_comment: Sequelize.TEXT,
})

module.exports = Comment;