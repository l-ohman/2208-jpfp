import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { SingleCampusListed, CampusForm } from "../";
import { updateSingleItem } from "../../store/singleItem";

const AllCampuses = () => {
  const campuses = useSelector((state) => state.campuses);
  const dispatch = useDispatch();
  
  // Using 'setTimeout' to prevent an error caused by multiple components rendering at the same time
  setTimeout(() => dispatch(updateSingleItem({})), 0)

  return (
    <>
      <div className="campusList">
        {campuses.length > 0 ? campuses.map((campus) => (
          <SingleCampusListed key={campus.id} data={campus} />
        )) : <h3>No campuses found!</h3>}
      </div>
      <CampusForm isEdit={false} />
    </>
  );
};

export default AllCampuses;
