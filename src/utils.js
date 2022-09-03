export const fixObjectForForm = (student) => {
  const studentCopy = { ...student };

  studentCopy.gpa = student.gpa ? student.gpa : "";
  studentCopy.campusId = student.campusId ? student.campusId : "";
  return studentCopy;
};

export const fixObjectForDatabase = (student, campuses) => {
  const studentCopy = { ...student };

  delete studentCopy.fullName; // This cannot be set in the db

  // If form contains an empty string, don't set 'gpa' to 0
  if (studentCopy.gpa === "") {
    delete studentCopy.gpa;
  } else {
    // Prevent 'NaN' from being sent
  }

  if (studentCopy.campusId) {
    // For updating singleItem view
    const updatedCampusForStudent = campuses.find(
      (campus) => campus.id == studentCopy.campusId
    );
    studentCopy.campus = updatedCampusForStudent;
  } else if (studentCopy.campusId === "") {
    studentCopy.campusId = null;
    delete studentCopy.campus;
  } else {
    delete studentCopy.campusId;
  }

  return studentCopy;
};

// Checks validity of form *before* sending to server
export const studentFormValidityCheck = (form) => {
  const validNameRegex = /[/\\;_+=*~`'"\d{}[\]()]/;

  if (!form.firstName) {
    return '"First name" is a required field';
  } else if (!form.lastName) {
    return '"Last name" is a required field';
  } else if (
    form.firstName.match(validNameRegex) ||
    form.lastName.match(validNameRegex)
  ) {
    return "Names cannot include symbols or numbers";
  } else if (!form.email) {
    return '"Student email" is a required field';
  } else if (form.gpa !== "" && isNaN(Number(form.gpa))) {
    return `"${form.gpa}" is not a valid GPA`;
  } else if (Number(form.gpa) > 4 || Number(form.gpa) < 0) {
    return "GPAs must be between 0 and 4";
  } else {
    return false; // false == a valid form
  }
};

export const campusFormValidityCheck = (form) => {
  if (!form.name) {
    return '"Campus name" is a required field';
  } else if (form.name.match(/\d/)) {
    return 'Numbers not allowed in "Campus name"';
  } else if (!form.address) {
    return '"Campus address" is a required field';
  } else {
    return false; // false == a valid form
  }
};
