import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateStudent } from "../../store/students";

const EditStudentForm = () => {
  const singleItem = useSelector((state) => state.singleItem);
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
    const updatedForm = {...form};
    const fieldUpdated = event.target.name;
    updatedForm[fieldUpdated] = event.target.value;
    
    setForm(updatedForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Copied from NewStudentForm (temporary fix)
    let newStudent = { ...form };
    // If it is an empty string, don't set 'gpa' to 0
    if (newStudent.gpa.length === 0) {
      delete newStudent.gpa;
    } else {
      // Needs a fix - this allows submitting characters for GPA field (but correctly goes into DB as null)
      newStudent.gpa = +newStudent.gpa;
    }

    dispatch(updateStudent(newStudent));
  };

  if (!form.firstName) {
    return(<p>Loading form...</p>)
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
