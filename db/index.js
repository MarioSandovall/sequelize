const Sequelize = require('sequelize');

const password = '';
const database = 'test'
const user = 'postgres';
const host = 'localhost';
const dialect = 'postgres';

const connection = new Sequelize(database, user, password,{
  host,
  dialect,
  define: {
    freezeTableName:true
  }
});


exports.connection = connection;