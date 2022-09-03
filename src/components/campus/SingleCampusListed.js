import React from "react";
import { Link } from "react-router-dom";
import { DeleteItem } from "../";

const SingleCampusListed = ({ data: campus }) => {
  return (
    <div className="campusListItem">
      <h2>
        <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
      </h2>
      <DeleteItem id={campus.id} name={campus.name} type="campus" />
      <p>Located at: {campus.address}</p>
      <img
        src={campus.imageUrl ? campus.imageUrl : "/images/noCampusImage.png"}
        alt="Campus image"
      />
      <hr />
    </div>
  );
};

export default SingleCampusListed;
