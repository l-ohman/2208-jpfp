import React from "react";
import { Link } from "react-router-dom";
import { DeleteItem } from "../";

const SingleStudentListed = ({ data: student }) => {
  return (
    <div className="studentGridItem">
      <h2>
        <Link to={`/students/${student.id}`}>
          {student.firstName} {student.lastName}
        </Link>
      </h2>
      <DeleteItem id={student.id} name={student.fullName} type="student" />
      <div className="studentImageContainer">
        <img
          src={student.imageUrl ? student.imageUrl : "/images/noUserImage.png"}
          alt="Student image"
        />
      </div>
      <p>Contact: {student.email}</p>
    </div>
  );
};

export default SingleStudentListed;
