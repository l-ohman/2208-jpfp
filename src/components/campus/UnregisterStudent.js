// This is in the 'campus' directory because it is only displayed on campus items
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSingleItem } from "../../store/singleItem";

const UnregisterStudent = ({ studentId }) => {
  const students = useSelector((state) => state.singleItem.students);
  const dispatch = useDispatch();

  const handleClick = () => {
    const student = students.find((student) => student.id === studentId);
    delete student.fullName; // I officially regret adding this field
    const updatedStudent = { ...student, campusId: null };

    console.log("'unregister' button clicked")
    // dispatch(updateSingleItem(updatedStudent, "students"));
  };

  return (
    <button className="unregisterBtn" onClick={handleClick}>
      Unregister Student
    </button>
  );
};

export default UnregisterStudent;
