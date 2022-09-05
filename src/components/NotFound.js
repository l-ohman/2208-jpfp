import React from "react";

const NotFound = ({ type }) => {
  return <h2 className="notFound">404 - Could not find that {type ? type : "item"}</h2>;
};

export default NotFound;
