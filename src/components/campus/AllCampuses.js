import React from "react";
import { useSelector } from "react-redux";
import { SingleCampusListed, NewCampusForm } from "../"

const AllCampuses = () => {
    const campuses = useSelector(state => state.campuses);

    return(
        <>
        <div className="leftContainer">
            {campuses.map(campus => 
                <SingleCampusListed key={campus.id} data={campus}/>
            )}
        </div>
        <NewCampusForm className="rightContainer"/>
        </>
    )
}

export default AllCampuses;
