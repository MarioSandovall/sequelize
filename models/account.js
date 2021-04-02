const Sequelize = require("sequelize");
const { connection } = require("../db");

const Account = connection.define('Account', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    }
  }
})

exports.Account = Account;