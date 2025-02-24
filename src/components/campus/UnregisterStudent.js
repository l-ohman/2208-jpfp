import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateStudent } from "../../store/students";
import { removeStudentFromCampus } from "../../store/singleItem";

const UnregisterStudent = ({ studentId }) => {
  const student = useSelector((state) =>
    state.students.find((student) => student.id === studentId)
  );
  const dispatch = useDispatch();

  const handleClick = async () => {
    const updatedStudent = { ...student, campusId: null };
    delete updatedStudent.fullName;

    const wasUpdateSuccessful = await dispatch(updateStudent(updatedStudent));
    if (wasUpdateSuccessful) {
      dispatch(removeStudentFromCampus(student.id));
    }
  };

  return (
    <button className="unregisterBtn" onClick={handleClick}>
      Unregister Student
    </button>
  );
};

export default UnregisterStudent;
