import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteItem } from "../";

const SingleCampusListed = ({ data: campus }) => {
  return (
    <div>
      <Link to={`/campuses/${campus.id}`}>
        <h2>{campus.name}</h2>
      </Link>
      <DeleteItem id={campus.id} name={campus.name} type="campus" />
      <p>Located at: {campus.address}</p>
      <img src={campus.imageUrl} />
      <hr />
    </div>
  );
};

export default SingleCampusListed;
