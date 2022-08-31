import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateCampus } from "../../store/campuses";

const EditCampusForm = () => {
  const singleItem = useSelector((state) => state.singleItem);
  const dispatch = useDispatch();

  // function to convert 'singleItem' in global state to form object
  const objectToForm = (singleItem) => ({
    id: singleItem.id,
    name: singleItem.name,
    address: singleItem.address,
    description: singleItem.description,
  });
  const [form, setForm] = React.useState(singleItem);

  React.useEffect(() => {
    setForm(objectToForm(singleItem));
  }, [singleItem])

  const handleChange = (event) => {
    const updatedForm = {...form};
    const fieldUpdated = event.target.name;
    updatedForm[fieldUpdated] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCampus = {...singleItem, ...form};
    dispatch(updateCampus(updatedCampus));
  };

  return (
    <div>
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
