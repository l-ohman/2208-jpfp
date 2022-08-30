import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSingleItem } from "../store/singleItem";

const SingleCampusView = () => {
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
      <img src={student.imageUrl} />
      <p>Current GPA: {student.gpa}</p>
    </div>
  );
};

export default SingleCampusView;
