import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateStudent } from "../../store/students";
import { updateSingleItem } from "../../store/singleItem";

const EditStudentForm = () => {
  const singleItem = useSelector((state) => state.singleItem);
  const allStudents = useSelector((state) => state.students);
  const dispatch = useDispatch();

  // function to convert 'singleItem' in global state to form object
  const objectToForm = (singleItem) => ({
    id: singleItem.id,
    firstName: singleItem.firstName,
    lastName: singleItem.lastName,
    email: singleItem.email,
    gpa: singleItem.gpa ? singleItem.gpa : "",
  });
  const [form, setForm] = React.useState(objectToForm(singleItem));

  React.useEffect(() => {
    setForm(objectToForm(singleItem));
  }, [singleItem]);

  const handleChange = (event) => {
    const updatedForm = { ...form };
    const fieldUpdated = event.target.name;
    updatedForm[fieldUpdated] = event.target.value;

    setForm(updatedForm);
  };

  // temporary variable placement
  let newStudent = { ...form };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Copied from NewStudentForm (temporary fix)
    newStudent = { ...form };
    // If it is an empty string, don't set 'gpa' to 0
    if (newStudent.gpa.length === 0) {
      delete newStudent.gpa;
    } else {
      // Needs a fix - this allows submitting characters for GPA field (but correctly goes into DB as null)
      newStudent.gpa = +newStudent.gpa;
    }

    dispatch(updateStudent(newStudent));
  };

  // We don't want to update the state if the server denies the request (such as invalid GPA), so we only dispatch the changes to 'singleItem' if there is a change in the full list (taken care of by 'updateCampus' called in 'handleSubmit')
  React.useEffect(() => {
    dispatch(updateSingleItem(newStudent));
  }, [allStudents]);

  if (!form.firstName) {
    return <p>Loading form...</p>;
  }
  return (
    <div>
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

        <button type="submit">Update Student Info</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
