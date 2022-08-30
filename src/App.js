import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { fetchStudents } from "./store/students";
import { fetchCampuses } from "./store/campuses";
import { Navbar, AllCampuses, AllStudents, SingleCampusView, SingleStudentView } from "./components";

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
