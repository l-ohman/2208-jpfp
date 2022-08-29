import React from "react";
import { useSelector } from "react-redux";
import SingleCampus from "./SingleCampusListed"

const AllCampuses = () => {
    const campuses = useSelector(state => state.campuses);

    return(
        <div>
            {campuses.map(campus => 
                <SingleCampus key={campus.id} data={campus}/>
            )}
        </div>
    )
}

export default AllCampuses;
