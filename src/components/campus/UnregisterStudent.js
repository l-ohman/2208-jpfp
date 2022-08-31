// This is in the 'campus' directory because it is only displayed on campus items
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStudent } from "../../store/students"; // for updating DB
import { removeStudentFromCampus } from "../../store/singleItem"; // for updating current display

const UnregisterStudent = ({ studentId }) => {
  const student = useSelector((state) =>
    state.students.find((student) => student.id === studentId)
  );
  const dispatch = useDispatch();

  // if the student is updated (confirmed by axios), update the page display
  React.useEffect(() => {
    if (student.campusId === null) {
      dispatch(removeStudentFromCampus(student.id));
    }
  }, [student])

  const handleClick = () => {
    delete student.fullName; // I officially regret adding this field
    const updatedStudent = { ...student, campusId: null };

    dispatch(updateStudent(updatedStudent));
  };

  return (
    <button className="unregisterBtn" onClick={handleClick}>
      Unregister Student
    </button>
  );
};

export default UnregisterStudent;
