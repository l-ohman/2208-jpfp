const createSeedDataSet = require("./seedGeneration");

// let [campuses, students] = createSeedDataSet(109, 1283);
let [campuses, students] = createSeedDataSet(5, 35);

module.exports = { campuses, students };
