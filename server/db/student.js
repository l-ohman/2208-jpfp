const Sequelize = require("sequelize");
const db = require("./database");

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
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
    },
    gpa: {
        type: Sequelize.DECIMAL,
        validate: {
            min: 0,
            max: 4,
        },
    },
})

module.exports = Student;
