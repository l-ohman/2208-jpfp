// Experimenting with probability and learning about Math in js (...I may have slightly overdone this)
const {
  streetCityNames,
  citySuffixes,
  streetSuffixes,
  descriptions,
  campusSuffixes,
  campusImageAddresses,
  lastNames,
  firstNames,
  emailSuffixes,
  studentImageAddresses,
  alphabet,
} = require("./seedData");

const fixCase = (string) => {
  let arr = string.split(" ");
  arr = arr.map((item) => {
    return item[0] + item.slice(1).toLowerCase();
  });
  return arr.join(" ");
};

// --- CAMPUS CREATION --- //

const randomInteger = (digitCount) => {
  // If 'digitCount' is 0 or undefined, select digit number randomly
  if (!digitCount) {
    digitCount = Math.ceil(Math.random() * 4);
    // 25% chance of 2 or 4 digit num, 50% chance of 3 digit num
    if (digitCount === 4) digitCount -= 2;
    digitCount++;
  }

  let output = [];
  for (let i = 0; i < digitCount; i++) {
    let newInt = Math.floor(Math.random() * 10);
    if (i === 0 && newInt === 0) {
      newInt += digitCount;
    }
    output.push(newInt);
  }
  return output.join("");
};

// num1 determines method to use, num2 determines item within method
const getStreetCityBase = (num1, num2) => {
  // 30% chance to get street/city name from firstnames/lastnames
  if (num1 > 0.9) {
    return firstNames[Math.floor(streetCityNames.length * num2)];
  } else if (num1 > 0.7) {
    return firstNames[Math.floor(streetCityNames.length * num2)];
  } else {
    return streetCityNames[Math.floor(streetCityNames.length * num2)];
  }
};

const createNewStreetAddress = () => {
  const addressNum = randomInteger();
  const streetName = getStreetCityBase(Math.random(), Math.random());
  const suffix =
    streetSuffixes[Math.floor(Math.random() * streetSuffixes.length)];
  return `${addressNum} ${streetName} ${suffix}`;
};

const createNewCityName = () => {
  let num1 = Math.random();
  let num2 = Math.random();

  const cityName = getStreetCityBase(num1, num2);

  if (Math.random() > 0.8 || num1 > 0.9) {
    const suffix =
      citySuffixes[Math.floor(citySuffixes.length * Math.random() ** 2.2)];
    if (suffix[0] === "S") return `${cityName}${suffix}`;
    else return `${cityName} ${suffix}`;
  } else {
    return cityName;
  }
};

const createNewState = () => {
  const letter1 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const letter2 = alphabet[Math.floor(Math.random() * alphabet.length)];

  if (letter1 === letter2) {
    return createNewState();
  }
  return `${letter1}${letter2}`;
};

const createNewZipCode = () => {
  return randomInteger(5);
};

const createCampusName = (name = "") => {
  if (!name) {
    name = lastNames[Math.floor(lastNames.length * Math.random())];
    // Adds another name
    if (Math.random() > 0.75) {
      name += ` ${lastNames[Math.floor(lastNames.length * Math.random())]}`;
    }
  }
  let suffix =
    campusSuffixes[Math.floor(campusSuffixes.length * Math.random() ** 2.5)];
  return `${name} ${suffix}`;
};

const createFullAddress = () => {
  const streetAddress = fixCase(createNewStreetAddress());
  const cityName = fixCase(createNewCityName());
  const state = createNewState();
  const zipCode = createNewZipCode();

  return [`${streetAddress}, ${cityName}, ${state} ${zipCode}`, cityName];
};

const createNewCampus = () => {
  let [campusAddress, cityName] = createFullAddress();

  let campusName;
  // Chance for campus name to be same as city name
  if (Math.random() > 0.72) {
    campusName = fixCase(createCampusName(cityName));
  } else {
    campusName = fixCase(createCampusName());
  }

  return {
    name: campusName,
    address: campusAddress,
    description: descriptions[Math.floor(descriptions.length * Math.random())],
    imageUrl: campusImageAddresses[0], // placeholder
  };
};

// --- STUDENT CREATION --- //

const createStudentName = () => {
  let firstName = fixCase(
    firstNames[Math.floor(firstNames.length * Math.random())]
  );
  let lastName = fixCase(
    lastNames[Math.floor(lastNames.length * Math.random())]
  );
  return [firstName, lastName];
};

const createStudentEmail = (first, last) => {
  let email;
  if (Math.random() > 0.89) {
    email = `${last}${first}`;
  } else {
    email = `${first}${last}`;
  }

  let num = Math.random();
  if (num > 0.8) {
    email = email.toLowerCase();
  } else if (num < 0.04) {
    email = email.toUpperCase();
  }

  num = Math.random();
  let emailNumber;
  if (num > 0.95) {
    emailNumber = randomInteger(1);
    email += emailNumber;
  } else if (num > 0.35) {
    emailNumber = randomInteger(2);
    email += emailNumber;
  }

  let suffix =
    emailSuffixes[Math.floor(emailSuffixes.length * Math.random() ** 2)];
  return email + suffix;
};

const createStudentGPA = () => {
  // With this curve, roughly 50% of students with have a gpa of 3.5+
  let gpaFromEq = ((Math.random() - 1) ** 3 + 1) * 4;
  if (gpaFromEq < 1) {
    return;
  }
  return gpaFromEq.toPrecision(2);
};

const createNewStudent = (campusCount = 1) => {
  let [firstName, lastName] = createStudentName();
  let email = createStudentEmail(firstName, lastName);

  // 10% chance a student does not have a GPA
  let gpa;
  if (Math.random() > 0.1) {
    gpa = createStudentGPA();
  }

  // 20% chance student does not have an assigned campus
  let campusId = null;
  if (Math.random() > 0.2) {
    campusId = Math.ceil(Math.random() * campusCount);
  }

  return {
    firstName,
    lastName,
    email,
    gpa,
    campusId,
    imageUrl: studentImageAddresses[0], // placeholder
  };
};

// --- FULL SEED DATA GENERATION --- //

const createCampuses = (num) => {
  const campuses = [];
  while (num > 0) {
    campuses.push(createNewCampus());
    num--;
  }
  return campuses;
};

const createStudents = (num, campusCount) => {
  const students = [];
  while (num > 0) {
    students.push(createNewStudent(campusCount));
    num--;
  }
  return students;
};

const createSeedDataSet = (campusCount, studentCount = campusCount * 5) => {
  const campuses = createCampuses(campusCount);
  const students = createStudents(studentCount, campusCount);

  return [campuses, students];
};

module.exports = createSeedDataSet;
