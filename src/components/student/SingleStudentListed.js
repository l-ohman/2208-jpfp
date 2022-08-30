import React from "react";
import { Link } from "react-router-dom";
import { DeleteItem } from "../";

const SingleStudentListed = ({ data: student }) => {
  return (
    <div>
      <Link to={`/students/${student.id}`}>
        <h2>
          {student.firstName} {student.lastName}
        </h2>
      </Link>
      <DeleteItem id={student.id} name={student.fullName}/>
      <img src={student.imageUrl} />
      <p>Contact: {student.email}</p>
      <p>Current GPA: {student.gpa}</p>
    </div>
  );
};

export default SingleStudentListed;
