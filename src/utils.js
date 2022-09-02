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
    if (isNaN(Number(studentCopy.gpa))) {
      alert(`"${studentCopy.gpa}" is not a valid GPA`);
      throw new Error("Invalid GPA entry");
    } else if (Number(studentCopy.gpa) > 4) {
      alert(`GPAs must be between 0 and 4`)
      throw new Error("Invalid GPA entry");
    }
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
