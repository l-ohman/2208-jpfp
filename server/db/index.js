// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");
const Student = require("./student");
const Campus = require("./campus");

Student.belongsTo(Campus);
Campus.hasMany(Student);

const dummyData = {
  students: [
    {
      firstName: "Foo",
      lastName: "Bar",
      email: "foobar@baz.com",
      imageUrl:
        "https://www.thecompliancecenter.com/wp-content/uploads/cm/l/b/lbbl4dgs_hi_1.gif",
    },
    {
      firstName: "Jimmy",
      lastName: "John",
      email: "jimmyjohn@gmail.com",
      gpa: 2.5,
    },
  ],
  campuses: [
    {
      name: "Lorem Ipsum University",
      imageUrl:
        "https://b.thumbs.redditmedia.com/4KKF9mkNZECNka_ExAeyJlec1Vg6iz__kfujrBSEbuU.png",
      address: "404 Drive, Albany, New York, 12201",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque posuere risus. Duis malesuada non velit a tincidunt. Mauris ante odio, consequat sed commodo et, ornare eleifend turpis. Vestibulum non euismod odio, vitae cursus magna. Duis nunc nisi, lobortis quis ullamcorper id, ultricies ut nulla. Quisque convallis velit ac risus elementum eleifend. Sed molestie velit id mi egestas, vehicula pretium purus pretium.",
    },
  ],
};

const syncAndSeed = async () => {
  await db.sync({ force: true });

  try {
    await Promise.all(dummyData.students.map(student => Student.create(student)));
    await Promise.all(dummyData.campuses.map(campus => Campus.create(campus)));

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
