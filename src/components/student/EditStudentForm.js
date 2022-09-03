import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateStudent } from "../../store/students";
import { updateSingleItem } from "../../store/singleItem";
import { fixObjectForForm, fixObjectForDatabase } from "../../utils";

const EditStudentForm = () => {
  const singleItem = useSelector((state) => state.singleItem);
  const campuses = useSelector((state) => state.campuses);
  const dispatch = useDispatch();

  // This means that form includes all data from singleItem - not just data that can be changed in the form
  const [form, setForm] = React.useState(fixObjectForForm(singleItem));

  React.useEffect(() => {
    setForm(fixObjectForForm(singleItem));
  }, [singleItem]);

  const handleChange = (event) => {
    const updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const student = fixObjectForDatabase(form, campuses);
    const [wasUpdateSuccessful, responseMsg] = await dispatch(
      updateStudent(student)
    );

    if (wasUpdateSuccessful) {
      dispatch(updateSingleItem(student));
      alert(`Successfully updated "${student.firstName} ${student.lastName}"`)
    } else {
      alert(responseMsg);
    }
  };

  // Maybe can add a separate property on objects such as "isLoaded"
  if (!form.firstName && form.firstName !== "") {
    return <p>Loading form...</p>;
  }
  return (
    <div className="formContainer">
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
