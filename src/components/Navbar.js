import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state);

  return (
    <h1>
      <Link to={"/campuses"}>Campuses ({state.campuses.length})</Link>
      {" | "}
      <Link to={"/students"}>Students ({state.students.length})</Link>
    </h1>
  );
};

export default Navbar;
