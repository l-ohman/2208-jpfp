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
    <form onSubmit={handleSubmit}>
      <label>
        Campus name:
        <input
          name="name"
          value={form.name}
          type="text"
          onChange={handleChange}
        />
        <br />
      </label>
      <label>
        Campus address:
        <input
          name="address"
          value={form.address}
          type="text"
          onChange={handleChange}
        />
        <br />
      </label>
      <label>
        Write a brief description of the campus:
        <input
          name="description"
          value={form.description}
          type="text"
          onChange={handleChange}
        />
        <br />
      </label>
      <button type="submit">Submit New Campus</button>
    </form>
  );
};

export default NewCampusForm;
