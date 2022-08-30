import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchSingleItem } from "../store/singleItem";

const SingleStudentView = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();

  const getCampusById = (campusId) => {
    return state.campuses.find(campus => campus.id === campusId)
  }
  const campus = getCampusById(state.singleItem.campusId);

  React.useEffect(() => {
    dispatch(fetchSingleItem(params.studentId, "students"));
  }, []);

  return (
    <div>
      <h1>
        {state.singleItem.firstName} {state.singleItem.lastName}
      </h1>
      <p>{state.singleItem.email}</p>
      {state.singleItem.campusId ? 
        <p>{state.singleItem.firstName} is a student at <Link to={`/campuses/${campus.id}`}>{campus.name}</Link></p>
        : <p>{state.singleItem.firstName} is not currently enrolled at any campus</p>}
      <img src={state.singleItem.imageUrl} />
      <p>Current GPA: {state.singleItem.gpa}</p>
    </div>
  );
};

export default SingleStudentView;
