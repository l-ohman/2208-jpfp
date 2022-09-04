import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { EditStudentForm, NotFound, StudentForm } from "../";
import { fetchSingleItem } from "../../store/singleItem";

const SingleStudentView = () => {
  const student = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();
  const { studentId } = useParams();

  // To track if student is loading/loaded (true) or does not exist (false)
  const [studentStatus, setStudentStatus] = React.useState(true);

  React.useEffect(() => {
    // Verifies that ID in URL is an integer
    if (isNaN(Number(studentId))) {
      setStudentStatus(false);
    } else {
      dispatch(fetchSingleItem(studentId, "students"));
    }
  }, []);

  if (!studentStatus || typeof student !== "object") {
    return <NotFound type="student" />;
  } else if (!student.firstName) {
    return <h2>Loading content...</h2>;
  }
  return (
    <div className="singleItemView">
      <div className="leftContainer singleStudentView">
        <img
          src={student.imageUrl ? student.imageUrl : "/images/noUserImage.png"}
          alt="Student image"
        />
        <div className="singleStudentViewInfo">
          <h1>
            {student.firstName} {student.lastName}
          </h1>
          <p>{student.email}</p>
          {student.campus ? (
            <p>
              {student.firstName} is a student at{" "}
              <Link to={`/campuses/${student.campus.id}`}>
                {student.campus.name}
              </Link>
            </p>
          ) : (
            <p>{student.firstName} is not currently enrolled at any campus</p>
          )}
          {student.gpa ? (
            <p>Current GPA: {(+student.gpa).toPrecision(2)}</p>
          ) : (
            <p>{student.firstName} does not have a GPA on record</p>
          )}
        </div>
      </div>
      <StudentForm isEdit={true} />
    </div>
  );
};

export default SingleStudentView;
