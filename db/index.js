const sequelize = require('sequelize');

const password = '';
const database = 'test'
const user = 'postgres';
const host = 'localhost';
const dialect = 'postgres';

const connection = new sequelize(database, user, password,{
  host,
  dialect,
});


exports.connection = connection;