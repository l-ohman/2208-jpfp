import React from "react";
import { Link } from "react-router-dom";

const SingleCampus = ({ data: campus }) => {
  return (
    <div>
      <Link to={`/campuses/${campus.id}`}>
        <h2>{campus.name}</h2>
      </Link>
      <p>Located at: {campus.address}</p>
      <p>
      </p>
      <img src={campus.imageUrl} />
    </div>
  );
};

export default SingleCampus;
