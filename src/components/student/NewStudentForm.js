import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { createStudent } from "../../store/students";
import { fixObjectForDatabase } from "../../utils";

const NewStudentForm = () => {
  const campuses = useSelector((state) => state.campuses);
  const dispatch = useDispatch();

  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
  };

  const [form, setForm] = React.useState(emptyForm);

  const handleChange = (event) => {
    let updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.firstName) {
      alert('"First name" is a required field');
    } else if (!form.lastName) {
      alert('"Last name" is a required field');
    } else if (!form.email) {
      alert('"Student email" is a required field');
    } else {
      const newStudent = fixObjectForDatabase(form, campuses);
      const [wasUpdateSuccessful, responseMsg] = await dispatch(
        createStudent(newStudent)
      );

      if (wasUpdateSuccessful) {
        alert(
          `Successfully added "${newStudent.firstName} ${newStudent.lastName}"`
        );
        setForm(emptyForm);
      } else {
        alert(responseMsg);
      }
    }
  };

  return (
    <div className="formContainer">
      <h2>Create new student</h2>
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
          <select name="campusId" onChange={handleChange}>
            <option value="">--Select a campus--</option>
            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit New Student</button>
      </form>
    </div>
  );
};

export default NewStudentForm;
