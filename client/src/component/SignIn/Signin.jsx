import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  setUser,
  showLoader,
  removeLoader,
  setAlert,
} from "../../action/index";
import Cookies from "js-cookie";

const Signin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoader());
    const { email, password } = data;
    if (!email || !password) {
      dispatch(removeLoader());
      dispatch(
        setAlert({
          loginEmail: "Please Enter The Valid Email",
          loginPassword: "Please Enter The Password",
        })
      );
      return;
    }
    const isValid = validateEmail(email);
    if (!isValid) {
      dispatch(removeLoader());
      dispatch(setAlert({ loginEmail: "Please Enter The Valid Email" }));
      return;
    }

    LoginEmployee(email, password);
  };

  useEffect(async () => {
    if (user !== null) {
      history.push("/");
      return;
    }
  }, [user]);

  const LoginEmployee = async (email, password) => {
    const response = await axios.post("/loginemployee", { email, password });
    if (response.data.type === "email") {
      dispatch(removeLoader());
      dispatch(setAlert({ loginEmail: response.data.err }));
      return;
    }
    if (response.data.type === "password") {
      dispatch(removeLoader());
      dispatch(setAlert({ loginPassword: response.data.err }));
      return;
    }
    Cookies.set("auth", response.data.data.tokens[0].token, { expires: 7 });

    dispatch(setUser(response.data.data));
    dispatch(removeLoader());
    history.push("/");
  };
  return (
    <div className="signin container mt-4">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            class="form-control"
            value={data.email}
            onChange={handleChange}
          />
          {alert.loginEmail && (
            <span className="text-danger alert_text">{alert.loginEmail}</span>
          )}
        </div>
        <div class="mb-3 " id="password">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            class="form-control"
            value={data.password}
            onChange={handleChange}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          {alert.loginPassword && (
            <p className="text-danger alert_text my-0">{alert.loginPassword}</p>
          )}
        </div>
        <p>
          <Link to="/forgotpassword" className="text-primary ">
            Forgot Password
          </Link>
        </p>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
