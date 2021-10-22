import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { showLoader, removeLoader } from "../../action/index";

const PasswordForm = ({ code, email }) => {
  const [isCodeVarified, setIsCodeVarified] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [data, setData] = useState({ password: "", cpassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (codeInput !== code.toString()) {
      return alert("Code is Wrong");
    }
    setIsCodeVarified(true);
  };

  let name, value;
  const handlePasswordChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { password, cpassword } = data;
    if (!password || !cpassword) {
      return alert("All Fields are required");
    }
    if (password !== cpassword) {
      return alert("Password do not match");
    }
    dispatch(showLoader());
    const passResponse = await axios.post("/changepassword", {
      password,
      cpassword,
      email,
    });
    if (passResponse.data.err) {
      dispatch(removeLoader());
      return alert(passResponse.data.err);
    }
    alert("Password Changed.You can login");
    dispatch(removeLoader());
    history.push("/signin");
  };

  return (
    <div className="passform">
      {!isCodeVarified ? (
        <form onSubmit={handleOtpSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Enter Code
            </label>
            <input
              type="text"
              class="form-control"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <div class="mb-3" id="resetpassword">
            <label for="exampleInputEmail1" class="form-label">
              Enter New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              class="form-control"
              value={data.password}
              onChange={handlePasswordChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div class="mb-3" id="resetcpassword">
            <label for="exampleInputEmail1" class="form-label">
              Confirm Password
            </label>
            <input
              type={showCPassword ? "text" : "password"}
              name="cpassword"
              class="form-control"
              value={data.cpassword}
              onChange={handlePasswordChange}
            />
            <span onClick={() => setShowCPassword(!showCPassword)}>
              {showCPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PasswordForm;
