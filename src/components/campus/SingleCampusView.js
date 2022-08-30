import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { SingleStudentListed } from "../";
import { fetchSingleItem } from "../../store/singleItem";

const SingleCampusView = () => {
  const campus = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(fetchSingleItem(params.campusId, "campuses"));
  }, []);

  if (campus.students === undefined) {
    return (<h2>Loading content...</h2>)
  }
  return (
    <>
      <div>
        <h1>{campus.name}</h1>
        <h3>{campus.address}</h3>
        <p>
          <i>{campus.description}</i>
        </p>
        <img src={campus.imageUrl} />
      </div>
      <div>
        <h2>Students at this university:</h2>
        {campus.students.length ? (
          campus.students.map((student) => (
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
