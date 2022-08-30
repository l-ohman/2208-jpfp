import React from "react";
import { useDispatch } from "react-redux";
import { deleteCampus } from "../store/campuses";

const DeleteItem = ({ id, name }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteCampus(id));
    }
  };

  return (
    <div className="deleteBtnContainer">
      <button onClick={handleDelete} className="deleteBtn">
        x
      </button>
    </div>
  );
};

export default DeleteItem;
