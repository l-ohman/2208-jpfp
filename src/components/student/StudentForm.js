import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { createStudent, updateStudent } from "../../store/students";
import { updateSingleItem } from "../../store/singleItem";
import {
  fixObjectForForm,
  fixObjectForDatabase,
  studentFormValidityCheck,
} from "../../utils";

const StudentForm = ({ isEdit }) => {
  const campuses = useSelector((state) => state.campuses);
  const dispatch = useDispatch();

  let singleItem;
  if (isEdit) {
    singleItem = useSelector((state) => state.singleItem);
  }

  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
    imageUrl: "",
  };

  const [form, setForm] = React.useState(emptyForm);

  if (isEdit && singleItem) {
    React.useEffect(() => {
      setForm(fixObjectForForm(singleItem));
    }, [singleItem]);
  }

  const handleChange = (event) => {
    let updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let invalidFormMessage = studentFormValidityCheck(form);
    if (invalidFormMessage) {
      alert(invalidFormMessage);
      return;
    }

    const student = fixObjectForDatabase(form, campuses);
    const wasUpdateSuccessful = await dispatch(
      isEdit ? updateStudent(student) : createStudent(student)
    );

    if (wasUpdateSuccessful) {
      alert(
        `Successfully ${isEdit ? "updated" : "added"} "${student.firstName} ${
          student.lastName
        }"`
      );

      if (isEdit) dispatch(updateSingleItem(student));
      else setForm(emptyForm);
    } else {
      alert(
        `Unable to ${
          isEdit ? "update" : "add"
        } student - check your form for errors!`
      );
    }
  };

  return (
    <div className="rightContainer">
      <div className="formContainer">
        <h2>{isEdit ? "Edit " : "Create New "} Student</h2>
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
            Student image (URL):
            <input
              name="imageUrl"
              value={form.imageUrl}
              type="text"
              onChange={handleChange}
            />
          </label>

          <label>
            <select
              name="campusId"
              onChange={handleChange}
              value={form.campusId}
            >
              <option value="">--Select a campus--</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">
            {isEdit ? "Update " : "Submit New "} Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
