import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateStudent } from "../../store/students";
import { updateSingleItem } from "../../store/singleItem";

const EditStudentForm = () => {
  const singleItem = useSelector((state) => state.singleItem);
  const campuses = useSelector((state) => state.campuses);
  const dispatch = useDispatch();

  // Fixes numbers and null values for form/database interactions
  const fixObjectForForm = (student) => {
    const studentCopy = { ...student };

    studentCopy.gpa = student.gpa ? student.gpa : "";
    studentCopy.campusId = student.campusId ? student.campusId : "";
    return studentCopy;
  };

  const fixObjectForDatabase = (student) => {
    const studentCopy = { ...student };

    delete studentCopy.fullName; // This cannot be set in the db

    // If it is an empty string, don't set 'gpa' to 0
    if (studentCopy.gpa === "") {
      delete studentCopy.gpa;
    } else {
      // Convert it to a number and prevent 'NaN' from being sent
      // studentCopy.gpa = Number(newStudent.gpa);
      if (isNaN(Number(studentCopy.gpa))) {
        delete studentCopy.gpa;
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

  // This means that form includes all data from singleItem - not just data that can be changed in the form
  const [form, setForm] = React.useState(fixObjectForForm(singleItem));

  React.useEffect(() => {
    setForm(fixObjectForForm(singleItem));
    console.log(form);
  }, [singleItem]);

  
  const handleChange = (event) => {
    const updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const student = fixObjectForDatabase(form)
    const wasUpdateSuccessful = await dispatch(updateStudent(student));
    if (wasUpdateSuccessful) {
      dispatch(updateSingleItem(student));
    }
  };

  // Maybe can add a separate property on objects such as "isLoaded"
  if (!form.firstName && form.firstName !== "") {
    return <p>Loading form...</p>;
  }
  return (
    <div className="rightContainer">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input
            name="firstName"
            value={form.firstName}
            type="text"
            onChange={handleChange}
          />
        </label>

        <label>
          Last name:
          <input
            name="lastName"
            value={form.lastName}
            type="text"
            onChange={handleChange}
          />
        </label>

        <label>
          Student email:
          <input
            name="email"
            value={form.email}
            type="text"
            onChange={handleChange}
          />
        </label>

        <label>
          Student GPA:
          <input
            name="gpa"
            value={form.gpa}
            type="text"
            onChange={handleChange}
          />
        </label>

        <label>
          <select name="campusId" onChange={handleChange} value={form.campusId}>
            <option value="">--Select a campus--</option>
            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id} name={campus.name}>
                {campus.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Update Student Info</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
