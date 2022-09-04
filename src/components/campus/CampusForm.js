import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateCampus, createCampus } from "../../store/campuses";
import { updateSingleItem } from "../../store/singleItem";
import { campusFormValidityCheck } from "../../utils";

const CampusForm = ({ isEdit }) => {
  // if 'isEdit' is true, the form is for editing; else it is for creating new student
  const dispatch = useDispatch();

  let singleItem;
  if (isEdit) {
    singleItem = useSelector((state) => state.singleItem);
  }

  const emptyForm = {
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  };

  const [form, setForm] = React.useState(emptyForm);

  if (isEdit && singleItem) {
    React.useEffect(() => {
      setForm(singleItem);
    }, [singleItem]);
  }

  const handleChange = (event) => {
    const updatedForm = { ...form };
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let invalidFormMessage = campusFormValidityCheck(form);
    if (invalidFormMessage) {
      alert(invalidFormMessage);
      return;
    }

    const wasUpdateSuccessful = await dispatch(
      isEdit ? updateCampus(form) : createCampus(form)
    );

    if (wasUpdateSuccessful) {
      alert(`Successfully ${isEdit ? "updated" : "added"} "${form.name}"`);

      if (isEdit) dispatch(updateSingleItem(form));
      else setForm(emptyForm);
    } else {
      alert(
        `Unable to ${
          isEdit ? "update" : "add"
        } campus - check your form for errors!`
      );
    }
  };

  return (
    <div className="rightContainer">
      <div className="formContainer">
        <h2>{isEdit ? "Edit " : "Create New "} Campus</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Campus name:
            <input
              name="name"
              value={form.name}
              type="text"
              onChange={handleChange}
            />
          </label>

          <label>
            Campus address:
            <input
              name="address"
              value={form.address}
              type="text"
              onChange={handleChange}
            />
          </label>

          <label>
            Description:
            <input
              name="description"
              value={form.description}
              type="text"
              onChange={handleChange}
            />
          </label>

          <label>
            Campus image (URL):
            <input
              name="imageUrl"
              value={form.imageUrl}
              type="text"
              onChange={handleChange}
            />
          </label>

          <button type="submit">Update Campus Info</button>
        </form>
      </div>
    </div>
  );
};

export default CampusForm;
