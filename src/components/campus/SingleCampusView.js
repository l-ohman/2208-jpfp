import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { UnregisterStudent, EditCampusForm } from "../";
import { fetchSingleItem, updateSingleItem } from "../../store/singleItem";

const SingleCampusView = () => {
  const campus = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(fetchSingleItem(params.campusId, "campuses"));
  }, []);


  // If the campus is updated (confirmed by axios), update the display
  const campusInList = useSelector((state) =>
    state.campuses.find((item) => item.id === campus.id)
  );

  React.useEffect(() => {
    const updatedSingleCampus = {...campus, ...campusInList};
    dispatch(updateSingleItem(updatedSingleCampus))
  }, [campusInList])

  
  if (campus.students === undefined) {
    return <h2>Loading content...</h2>;
  }
  return (
    <div className="singleItemView">
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
            <div key={student.id}>
              <Link to={`/students/${student.id}`}>
                <p>{student.fullName}</p>
              </Link>
              <UnregisterStudent studentId={student.id} />
            </div>
          ))
        ) : (
          <p>This campus has no students!</p>
        )}
      </div>
      <EditCampusForm />
    </div>
  );
};

export default SingleCampusView;
