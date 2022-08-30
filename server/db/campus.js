const Sequelize = require("sequelize");
const db = require("./database");

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Campus;
