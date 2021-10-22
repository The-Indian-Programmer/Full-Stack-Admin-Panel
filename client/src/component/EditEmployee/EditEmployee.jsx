import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import checkValidation from "../checkValidation";

const EditEmployee = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "male",
    password: "",
    cpassword: "",
  });

  useEffect(async () => {
    const response = await axios({
      method: "get",
      url: "/getemployeebyid",
      headers: { authorization: id },
    });
    if (response.err) {
      return alert(response.err);
    }
    setData(response.data.user);
  }, [id]);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const isValid = checkValidation(data);
    if (isValid) {
      return alert(isValid);
    }
    const response = await axios.post("/createemployee", data);
    if (response.err) {
      return alert(response.err);
    }
    history.push("/");
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  return (
    <form className="createemployee mt-4 container" onSubmit={handleSubmit}>
      <h2 className="text-center my-2">Update Employee</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          name="age"
          placeholder="Age"
          value={data.age}
          onChange={handleChange}
        />
      </div>
      <select
        value={data.gender}
        onChange={handleChange}
        name="gender"
        className="form-select mb-3"
        aria-label="Gender"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </select>

      <button
        type="submit"
        className="btn btn-success d-block m-auto container"
      >
        Register
      </button>
    </form>
  );
};

export default EditEmployee;
