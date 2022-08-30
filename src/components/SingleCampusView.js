import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { SingleStudentListed } from "./";
import { fetchSingleItem } from "../store/singleItem";

const SingleCampusView = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();

  // const getStudentsByCampus = (campusId) => {
  //   return state.students.filter((student) => student.campusId === campusId);
  // };
  // const studentsAtCampus = getStudentsByCampus(state.singleItem.id);

  React.useEffect(() => {
    dispatch(fetchSingleItem(params.campusId, "campuses"));
  }, []);

  if (state.singleItem.students === undefined) {
    return (<h2>Loading content</h2>)
  }
  return (
    <>
      <div>
        <h1>{state.singleItem.name}</h1>
        <h3>{state.singleItem.address}</h3>
        <p>
          <i>{state.singleItem.description}</i>
        </p>
        <img src={state.singleItem.imageUrl} />
      </div>
      <div>
        <h2>Students at this university:</h2>
        {state.singleItem.students.length ? (
          state.singleItem.students.map((student) => (
            <SingleStudentListed key={student.id} data={student} />
          ))
        ) : (
          <p>This campus has no students!</p>
        )}
      </div>
    </>
  );
};

export default SingleCampusView;
