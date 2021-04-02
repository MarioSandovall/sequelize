const Sequelize = require("sequelize");
const { connection } = require("../db");

const User = require("./user");

const Project = connection.define('Project', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  },
  title: Sequelize.STRING,
});

module.exports = Project;