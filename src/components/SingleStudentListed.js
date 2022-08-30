import React from "react";
import { Link } from "react-router-dom";

const SingleStudent = ({ data: student }) => {
  return (
    <div>
      <Link to={`/students/${student.id}`}>
        <h2>
          {student.firstName} {student.lastName}
        </h2>
      </Link>
      <img src={student.imageUrl} />
      <p>Contact: {student.email}</p>
      <p>Current GPA: {student.gpa}</p>
    </div>
  );
};

export default SingleStudent;
