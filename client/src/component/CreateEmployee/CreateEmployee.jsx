import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import checkValidation from "../checkValidation";
import { showLoader, removeLoader, setAlert } from "../../action/index";
const CreateEmployee = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    role: "employee",
    gender: "male",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    dispatch(showLoader());
    e.preventDefault();
    const isValid = checkValidation(data);

    if (isValid.errLength > 0) {
      dispatch(setAlert(isValid.errMsg));
      dispatch(removeLoader());
      return;
    }

    const response = await axios.post("/registeremployee", data);

    if (response.data.err) {
      dispatch(removeLoader());
      return alert(response.data.err);
    }
    dispatch(removeLoader());

    history.push("/");
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (user === null) {
      history.push("/");
      return;
    }
    if (user.role !== "admin") {
      history.push("/");
      return;
    }
  }, []);

  return (
    <form className="createemployee mt-4 container" onSubmit={handleSubmit}>
      <h2 className="text-center my-2">Register New Employee</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
        {alert.name && (
          <span className="text-danger alert_text">{alert.name}</span>
        )}
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
        {alert.email && (
          <span className="text-danger alert_text">{alert.email}</span>
        )}
      </div>
      {}
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          name="age"
          placeholder="Age"
          value={data.age}
          onChange={handleChange}
        />
        {alert.age && (
          <span className="text-danger alert_text">{alert.age}</span>
        )}
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
      {alert.gender && (
        <span className="text-danger alert_text">{alert.gender}</span>
      )}
      <select
        value={data.role}
        onChange={handleChange}
        name="role"
        className="form-select mb-3"
        aria-label="Role"
      >
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>
      {alert.role && (
        <span className="text-danger alert_text">{alert.role}</span>
      )}
      <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        {alert.password && (
          <span className="text-danger alert_text">{alert.password}</span>
        )}
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="cpassword"
          className="form-control"
          placeholder="Confirm Password"
          value={data.cpassword}
          onChange={handleChange}
        />
        {alert.cpassword && (
          <span className="text-danger alert_text">{alert.cpassword}</span>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-success d-block m-auto container"
      >
        Register
      </button>
    </form>
  );
};

export default CreateEmployee;
