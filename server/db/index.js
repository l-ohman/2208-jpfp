// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:
const db = require("./database");
const Student = require("./student");
const Campus = require("./campus");

Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = async () => {
  await db.sync({ force: true });

  try {
    // dummy data in 'seed.js'
    const { students, campuses } = require("./seed");

    await Promise.all(students.map((student) => Student.create(student)));
    await Promise.all(campuses.map((campus) => Campus.create(campus)));

    console.log(`Seeding successful`);
  } catch (error) {
    console.error("Seeding database failed:", error);
  }
};

module.exports = {
  db,
  syncAndSeed,
  Student,
  Campus,
};
