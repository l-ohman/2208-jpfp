import React from "react";
import { useSelector } from "react-redux";
import { SingleStudentListed, NewStudentForm } from "../";

const AllStudents = () => {
  const students = useSelector((state) => state.students);

  return (
    <>
      <div>
        {students.map((student) => (
          <SingleStudentListed key={student.id} data={student} className="leftContainer"/>
        ))}
      </div>
      <NewStudentForm className="rightContainer"/>
    </>
  );
};

export default AllStudents;
