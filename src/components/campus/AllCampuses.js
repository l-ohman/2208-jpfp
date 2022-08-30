import React from "react";
import { useSelector } from "react-redux";
import { SingleCampusListed, NewCampusForm } from "../";

const AllCampuses = () => {
  const campuses = useSelector((state) => state.campuses);

  return (
    <>
      <div className="leftContainer">
        {campuses.length > 0 ? campuses.map((campus) => (
          <SingleCampusListed key={campus.id} data={campus} />
        )) : <h3>No campuses found!</h3>}
      </div>
      <NewCampusForm />
    </>
  );
};

export default AllCampuses;
