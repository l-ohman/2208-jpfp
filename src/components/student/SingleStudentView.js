import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchSingleItem } from "../../store/singleItem";
import { EditStudentForm } from "../";

const SingleStudentView = () => {
  const student = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(fetchSingleItem(params.studentId, "students"));
  }, []);

  return (
    <div>
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <p>{student.email}</p>
      {student.campusId ? 
        <p>{student.firstName} is a student at <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></p>
        : <p>{student.firstName} is not currently enrolled at any campus</p>}
      <img src={student.imageUrl} />
      <p>Current GPA: {student.gpa}</p>
    </div>
  );
};

export default SingleStudentView;
