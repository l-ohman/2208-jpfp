const Sequelize = require("sequelize");
const db = require("./database");

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      not: /[;_+=*~`'"1234567890{}[\]()]/,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      not: /[;_+=*~`'"1234567890{}[\]()]/,
    },
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(val) {
      throw new Error("Cannot manually set 'fullName'");
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "",
    validate: {
      isUrl: true,
    }
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 4,
    },
  },
});

module.exports = Student;
