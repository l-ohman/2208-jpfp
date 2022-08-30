import React from "react";
import { useDispatch } from "react-redux";
import { createCampus } from "../../store/campuses";

const NewCampusForm = () => {
  const dispatch = useDispatch();
  const emptyForm = {
    name: "",
    address: "",
    description: "",
  };
  const [form, setForm] = React.useState(emptyForm);

  const handleChange = (event) => {
    let updatedForm = { ...form };
    const fieldUpdated = event.target.name;
    updatedForm[fieldUpdated] = event.target.value;

    setForm(updatedForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createCampus(form));
    setForm(emptyForm);
  };

  return (
    <div className="rightContainer">
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

        <button type="submit">Submit New Campus</button>
      </form>
    </div>
  );
};

export default NewCampusForm;
