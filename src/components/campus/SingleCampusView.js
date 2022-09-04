import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { UnregisterStudent, CampusForm, NotFound } from "../";
import { fetchSingleItem } from "../../store/singleItem";

const SingleCampusView = () => {
  const campus = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();
  const { campusId } = useParams();

  // To track if campus is loading/loaded (true) or does not exist (false)
  const [campusStatus, setCampusStatus] = React.useState(true);

  React.useEffect(() => {
    // Verifies that ID in URL is an integer
    if (isNaN(Number(campusId))) {
      setCampusStatus(false);
    } else {
      dispatch(fetchSingleItem(campusId, "campuses"));
    }
  }, []);

  if (!campusStatus || typeof campus !== "object") {
    return <NotFound type="campus" />;
  } else if (campus.students === undefined) {
    return <h2>Loading content...</h2>;
  }
  return (
    <div className="singleCampusViewContainer">
      <div className="singleItemView">
        <div className="leftContainer singleCampusView">
          <h1>{campus.name}</h1>
          <h3>{campus.address}</h3>
          <p>
            <i>{campus.description}</i>
          </p>

          <div className="imgContainer">
            {campus.imageUrl ? (
              <img src={campus.imageUrl} alt="Campus image" />
            ) : (
              ""
            )}
          </div>
        </div>
        <CampusForm isEdit={true} />
      </div>

      <hr />

      <div className="studentItemCampusPage">
        <h2>Students at this university {campus.students.length ? `(${campus.students.length})` : `(0)`}:</h2>
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
          ) : (
            <p id="noStudentsAtCampus">This campus has no students!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCampusView;
