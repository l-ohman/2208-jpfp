import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { fetchStudents } from "../store/students";
import { fetchCampuses } from "../store/campuses";
import {
  Navbar,
  Footer,
  AllCampuses,
  AllStudents,
  SingleCampusView,
  SingleStudentView,
  NotFound,
} from "./";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
