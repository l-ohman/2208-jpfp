import React from "react";

const SingleCampus = ({ data: campus }) => {
    
  return (
    <div>
      <h2>{campus.name}</h2>
      <p>Located at: {campus.address}</p>
      <p>
        <i>{campus.description}</i>
      </p>
      <img src={campus.imageUrl} />
    </div>
  );
};

export default SingleCampus;
