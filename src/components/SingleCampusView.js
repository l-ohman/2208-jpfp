import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSingleItem } from "../store/singleItem";

const SingleCampusView = () => {
  const campus = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(fetchSingleItem(params.campusId, "campuses"));
  }, []);

  return (
    <div>
      <h1>{campus.name}</h1>
      <h2>{campus.address}</h2>
      <p>
        <i>{campus.description}</i>
      </p>
      <img src={campus.imageUrl} />
    </div>
  );
};

export default SingleCampusView;
