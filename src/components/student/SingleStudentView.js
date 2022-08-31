import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { EditStudentForm } from "../";
import { fetchSingleItem, updateSingleItem } from "../../store/singleItem";

const SingleStudentView = () => {
  const student = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(fetchSingleItem(params.studentId, "students"));
  }, []);

  
  // If the student is updated (confirmed by axios), update the display
  const studentInList = useSelector((state) =>
    state.students.find((item) => item.id === student.id)
  );

  React.useEffect(() => {
    // This was causing issues by merging with the previous object if it was a campus
    if (!student.students) {
      const updatedSingleStudent = { ...student, ...studentInList };
      dispatch(updateSingleItem(updatedSingleStudent));
    }
  }, [studentInList]);


  if (!student.fullName) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="singleItemView">
      <div>
        <h1>
          {student.firstName} {student.lastName}
        </h1>
        <p>{student.email}</p>
        {student.campusId ? (
          <p>
            {student.firstName} is a student at{" "}
            <Link to={`/campuses/${student.campus.id}`}>
              {student.campus.name}
            </Link>
          </p>
        ) : (
          <p>{student.firstName} is not currently enrolled at any campus</p>
        )}
        <img src={student.imageUrl} />
        <p>Current GPA: {student.gpa}</p>
      </div>
      <EditStudentForm />
    </div>
  );
};

export default SingleStudentView;
