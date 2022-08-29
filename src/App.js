import React from "react";
import AllCampuses from "./components/AllCampuses";
import AllStudents from "./components/AllStudents";
import { useDispatch } from "react-redux";

import { fetchStudents } from "./store/students";
import { fetchCampuses } from "./store/campuses";

function App(){
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchStudents())
        dispatch(fetchCampuses())
    }, [])

    return(
        <>
            <h1>Campuses</h1>
            <AllCampuses />
            <hr />
            <h1>Students</h1>
            <AllStudents />
        </>

    )
}

export default App;
