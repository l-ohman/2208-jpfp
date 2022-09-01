import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStudent } from "../../store/students";

const NewStudentForm = () => {
  const campuses = useSelector(state => state.campuses);
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
    const fieldUpdated = event.target.name;
    updatedForm[fieldUpdated] = event.target.value;
    
    console.log(updatedForm);

    setForm(updatedForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Necessary to convert 'gpa' to number type before submitting to DB
    let newStudent = { ...form };
    // If it is an empty string, don't set 'gpa' to 0
    if (newStudent.gpa.length === 0) {
      delete newStudent.gpa;
    } else {
      // Needs a fix - this allows submitting characters for GPA field (but correctly goes into DB as null)
      newStudent.gpa = +newStudent.gpa;
    }

    dispatch(createStudent(newStudent));
    setForm(emptyForm);
  };

  return (
    <div className="rightContainer">
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
            {campuses.map(campus => 
              <option key={campus.id} value={campus.id}>{campus.name}</option>
            )}
          </select>
        </label>

        <button type="submit">Submit New Student</button>
      </form>
    </div>
  );
};

export default NewStudentForm;
