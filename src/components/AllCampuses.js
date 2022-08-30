import React from "react";
import { useSelector } from "react-redux";
import { SingleCampusListed } from "./"

const AllCampuses = () => {
    const campuses = useSelector(state => state.campuses);

    return(
        <div>
            {campuses.map(campus => 
                <SingleCampusListed key={campus.id} data={campus}/>
            )}
        </div>
    )
}

export default AllCampuses;
