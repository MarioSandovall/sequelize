const Sequelize = require('sequelize');
const { connection } = require('../db');
const Comment = require('./comment');

const User = require('./user');

const Post = connection.define('Post', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
});

// Put foreignKey userId on post table
Post.belongsTo(User,
  {
    as: 'userRef',
    foreignKey: 'userId',
  }
);

//foreignKey = PostId in comment table
Post.hasMany(Comment, {
  as: 'all_comments',
  foreignKey: 'postId',
});

module.exports = Post