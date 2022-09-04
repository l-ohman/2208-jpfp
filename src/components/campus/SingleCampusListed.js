import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteItem } from "../";

const SingleCampusListed = ({ data: campus }) => {
  const allStudents = useSelector((state) => state.students);

  const getNumberOfStudents = (campusId) => {
    let students = allStudents.filter((item) => item.campusId === +campusId);
    return students.length;
  };

  return (
    <div className="campusListItem">
      <div className="campusListItemLeft">
        <h2>
          <Link to={`/campuses/${campus.id}`}>
            {campus.name}
            {` (${getNumberOfStudents(campus.id)})`}
          </Link>
        </h2>
        <p>Located at: {campus.address}</p>

        <DeleteItem id={campus.id} name={campus.name} type="campus" />
      </div>

      {campus.imageUrl ? (
        <div className="campusListItemImageContainer">
          <img src={campus.imageUrl} alt="Campus image" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleCampusListed;
