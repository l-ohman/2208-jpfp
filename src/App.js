import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStudents } from "./store/students";
import { fetchCampuses } from "./store/campuses";

function App(){
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    
    React.useEffect(() => {
        dispatch(fetchStudents())
        dispatch(fetchCampuses())
    }, [])

    return(
        <>
            <div>Test Your App</div>
        </>

    )
}

export default App;