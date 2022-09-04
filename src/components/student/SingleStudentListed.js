import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteItem } from "../";

const SingleStudentListed = ({ data: student }) => {
  const campuses = useSelector((state) => state.campuses);

  const isStudentEnrolled = student.campusId;
  const getCampusNameById = (id) => {
    let campus = campuses.find((item) => item.id === +id);
    if (campus) return campus.name;
  };

  return (
    <div className="studentGridItem">
      <div className="studentGridItemHeader">
        <img
          src={student.imageUrl ? student.imageUrl : "/images/noUserImage.png"}
          alt="Student image"
        />

        <h2>
          <Link to={`/students/${student.id}`}>
            {student.firstName} {student.lastName}
          </Link>
        </h2>
      </div>

      <div className="studentGridItemInfo centerText">
        <p>
          <i>{student.email}</i>
        </p>

        {isStudentEnrolled ? (
          <p>
            Enrolled at <b>{getCampusNameById(student.campusId)}</b>
          </p>
        ) : (
          <p>Not currently enrolled at a campus</p>
        )}

        {student.gpa ? (
          <p>
            GPA: <b>{(+student.gpa).toPrecision(2)}</b>
          </p>
        ) : (
          <p>No GPA on record</p>
        )}
      </div>

      <DeleteItem id={student.id} name={student.fullName} type="student" />
    </div>
  );
};

export default SingleStudentListed;
