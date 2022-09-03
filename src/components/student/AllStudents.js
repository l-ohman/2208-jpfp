import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SingleStudentListed, NewStudentForm, StudentForm } from "../";
import { updateSingleItem } from "../../store/singleItem";

const AllStudents = () => {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  
  // Using 'setTimeout' to prevent an error caused by multiple components rendering at the same time
  setTimeout(() => dispatch(updateSingleItem({})), 0)

  return (
    <>
      <div className="leftContainer studentGrid">
        {students.length > 0 ? students.map((student) => (
          <SingleStudentListed key={student.id} data={student} />
        )) : <h3>No students found!</h3>}
      </div>
      <StudentForm isEdit={false} />
    </>
  );
};

export default AllStudents;
