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
    const updatedSingleCampus = { ...campus, ...campusInList };
    dispatch(updateSingleItem(updatedSingleCampus));
  }, [campusInList]);

  if (campus.students === undefined) {
    return <h2>Loading content...</h2>;
  }
  return (
    <div className="singleCampusViewContainer">
      <div className="singleCampusView">
        <div className="leftContainer">
          <h1>{campus.name}</h1>
          <h3>{campus.address}</h3>
          <p>
            <i>{campus.description}</i>
          </p>
          <img src={campus.imageUrl} />
        </div>
        <EditCampusForm />
      </div>
      <hr />
      <div className="studentItemCampusPage">
        <h2>Students at this university:</h2>
        <div className="studentListCampusPage">
          {campus.students.length ? (
            campus.students.map((student) => (
              <div key={student.id} className="singleStudentCampusPage">
                <Link to={`/students/${student.id}`}>
                  <p>{student.fullName}</p>
                </Link>
                <UnregisterStudent studentId={student.id} />
              </div>
            ))
          ) : ( // I will never understand why Prettier does this
            <p id="noStudentsAtCampus">This campus has no students!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCampusView;
