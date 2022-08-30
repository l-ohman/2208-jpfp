import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { fetchStudents } from "./store/students";
import { fetchCampuses } from "./store/campuses";
import AllCampuses from "./components/AllCampuses";
import AllStudents from "./components/AllStudents";
import Navbar from "./components/Navbar";
import SingleCampusView from "./components/SingleCampusView";
import SingleStudentView from "./components/SingleStudentView";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCampuses());
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<AllStudents />} />
        <Route path={"/students"} element={<AllStudents />} />
        <Route path={"/students/:studentId"} element={<SingleStudentView />} />
        <Route path={"/campuses"} element={<AllCampuses />} />
        <Route path={"/campuses/:campusId"} element={<SingleCampusView />} />
      </Routes>
    </>
  );
}

export default App;
