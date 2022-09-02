const Sequelize = require("sequelize");
const db = require("./database");

const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      not: /[;_+=*~`'"1234567890{}[\]()]/,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "",
    validate: {
      isUrl: true,
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      not: /[;_+=*~`'"{}}[\]()]/,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Campus;
