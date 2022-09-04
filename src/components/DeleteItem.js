import React from "react";
import { useDispatch } from "react-redux";
import { deleteCampus } from "../store/campuses";
import { deleteStudent } from "../store/students";
import { capitalizeFirstLetter } from "../utils"

const DeleteItem = ({ id, name, type }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      if (type === "campus") {
        dispatch(deleteCampus(id));
      } else if (type === "student") {
        dispatch(deleteStudent(id));
      }
    }
  };

  return (
    // <div className="deleteBtnContainer">
      <button onClick={handleDelete} className="deleteBtn">
        Delete {` ${capitalizeFirstLetter(type)}`}
      </button>
    // </div>
  );
};

export default DeleteItem;
