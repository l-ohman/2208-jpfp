import React from "react";
import { useSelector } from "react-redux";
import { SingleCampusListed, NewCampusForm } from "../"

const AllCampuses = () => {
    const campuses = useSelector(state => state.campuses);

    return(
        <div>
            {campuses.map(campus => 
                <SingleCampusListed key={campus.id} data={campus}/>
            )}
            <NewCampusForm />
        </div>
    )
}

export default AllCampuses;
