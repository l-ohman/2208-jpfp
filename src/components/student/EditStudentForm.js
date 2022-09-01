import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateStudent } from "../../store/students";
import { updateSingleItem } from "../../store/singleItem";

const EditStudentForm = () => {
  const singleItem = useSelector((state) => state.singleItem);
  const campuses = useSelector(state => state.campuses);
  const dispatch = useDispatch();
  // ADDS THE CAMPUS ID TO SINGLEITEM STUDENT, BUT NOT THE CAMPUS NAME!

  // function to convert 'singleItem' in global state to form object (refactor this)
  const objectToForm = (singleItem) => ({
    id: singleItem.id,
    firstName: singleItem.firstName,
    lastName: singleItem.lastName,
    email: singleItem.email,
    gpa: singleItem.gpa ? singleItem.gpa : "",
    campusId: singleItem.campusId ? singleItem.campusId : "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Copied from NewStudentForm (temporary fix)
    let newStudent = { ...singleItem, ...form };
    delete newStudent.fullName;
    // If it is an empty string, don't set 'gpa' to 0
    if (newStudent.gpa.length === 0) {
      delete newStudent.gpa;
    } else {
      // Needs a fix - this allows submitting characters for GPA field (but correctly goes into DB as null)
      newStudent.gpa = +newStudent.gpa;
    }

    if (newStudent.campusId) {
      // converting form "number" to real number
      newStudent.campusId = Number(newStudent.campusId);

      // this is only necessary for updating singleItem view
      const updatedCampusForStudent = campuses.find(campus => campus.id === newStudent.campusId)
      newStudent.campus = updatedCampusForStudent

    } else if (newStudent.campusId === "") {
      newStudent.campusId = null
      delete newStudent.campus
    } else {
      delete newStudent.campusId
    }

    const wasUpdateSuccessful = await dispatch(updateStudent(newStudent));
    console.log('wasUpdateSuccessful:', wasUpdateSuccessful)
    if (wasUpdateSuccessful) {
      // console.log
      dispatch(updateSingleItem(newStudent));
    }
  };

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

        <label>
          <select name="campusId" onChange={handleChange} value={form.campusId}>
            <option value="">--Select a campus--</option>
            {campuses.map(campus => 
              <option key={campus.id} value={campus.id} name={campus.name}>{campus.name}</option>
            )}
          </select>
        </label>

        <button type="submit">Update Student Info</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
