import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { fetchStudents } from "./store/students";
import { fetchCampuses } from "./store/campuses";
import {
  Navbar,
  AllCampuses,
  AllStudents,
  SingleCampusView,
  SingleStudentView,
  NotFound
} from "./components";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCampuses());
    // Should add some 'contentLoaded' boolean to state for displaying a "Loading..." message
  }, []);

  return (
    <>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route index element={<AllStudents />} />
          <Route path={"/students"} element={<AllStudents />} />
          <Route
            path={"/students/:studentId"}
            element={<SingleStudentView />}
          />
          <Route path={"/campuses"} element={<AllCampuses />} />
          <Route path={"/campuses/:campusId"} element={<SingleCampusView />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
