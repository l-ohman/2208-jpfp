import React from "react";
import { useSelector } from "react-redux";
import { SingleStudentListed, NewStudentForm } from "../";

const AllStudents = () => {
  const students = useSelector((state) => state.students);

  return (
    <>
      <div className="leftContainer">
        {students.length > 0 ? students.map((student) => (
          <SingleStudentListed key={student.id} data={student} />
        )) : <h3>No students found!</h3>}
      </div>
      <NewStudentForm />
    </>
  );
};

export default AllStudents;
