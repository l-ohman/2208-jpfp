const createSeedDataSet = require("./seedGeneration");

let campusesToGenerate = 13;
let studentsToGenerate = 121;

let [campuses, students] = createSeedDataSet(campusesToGenerate, studentsToGenerate);

module.exports = { campuses, students };
