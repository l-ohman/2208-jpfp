import React from "react";

const NewCampusForm = () => {
  return (
    <form>
      <label>
        Campus name: <br />
        <input id="name" type="text" /> <br />
      </label>
      <label>
        Campus address: <br />
        <input id="address" type="text" /> <br />
      </label>
      <label>
        Write a brief description of the campus: <br />
        <input id="description" type="text" /> <br />
      </label>
      <button type="submit">Submit New Campus</button>
    </form>
  );
};

export default NewCampusForm;
