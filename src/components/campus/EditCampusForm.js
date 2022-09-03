import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateCampus } from "../../store/campuses";
import { updateSingleItem } from "../../store/singleItem";

const EditCampusForm = () => {
  const singleItem = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();

  const [form, setForm] = React.useState(singleItem);

  React.useEffect(() => {
    setForm(singleItem);
  }, [singleItem])

  const handleChange = (event) => {
    const updatedForm = {...form};
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCampus = {...singleItem, ...form};
    const [wasUpdateSuccessful, returnMsg] = await dispatch(updateCampus(updatedCampus));

    if (wasUpdateSuccessful) {
      dispatch(updateSingleItem(updatedCampus));
      alert(`Successfully updated "${updatedCampus.name}"`)
    } else {
      alert(returnMsg);
    }
  };

  return (
    <div className="formContainer">
      <h2> Edit Campus </h2>
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

        <button type="submit">Update Campus Info</button>
      </form>
    </div>
  );
};

export default EditCampusForm;
