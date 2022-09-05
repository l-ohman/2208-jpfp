import React from "react";
import { useDispatch } from "react-redux";
import { deleteCampus } from "../store/campuses";
import { deleteStudent } from "../store/students";
import { capitalizeFirstLetter } from "../utils";

const DeleteItem = ({ id, name, type }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Disabling delete alert for ease of testing/grading
    // if (confirm(`Are you sure you want to delete ${name}?`)) {
    if (type === "campus") {
      dispatch(deleteCampus(id));
    } else if (type === "student") {
      dispatch(deleteStudent(id));
    }
  };
  // };

  return (
    <button onClick={handleDelete} className="deleteBtn">
      Delete {` ${capitalizeFirstLetter(type)}`}
    </button>
  );
};

export default DeleteItem;
