import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const state = useSelector((state) => state);

  return (
    <div id="navbar">
      <h1>
        <Link to={"/campuses"}>Campuses ({state.campuses.length})</Link>
      </h1>
      <h1>
        <Link to={"/students"}>Students ({state.students.length})</Link>
      </h1>
    </div>
  );
};

export default Navbar;
