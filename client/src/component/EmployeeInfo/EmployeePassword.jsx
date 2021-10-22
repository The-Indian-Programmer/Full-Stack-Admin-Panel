import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, removeLoader, setAlert } from "../../action/index";
const EmployeePassword = ({ data, id }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [passData, setPassData] = useState({ password: "", cpassword: "" });
  const [password, setPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPassData({ ...passData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const passwordCheck = await checkPasswordValidation(
      password,
      passData.password,
      passData.cpassword
    );
    if (Object.keys(passwordCheck).length > 0) {
      dispatch(setAlert(passwordCheck));
      return;
    }
    dispatch(showLoader());
    const response = await axios.post("/updateemployeepasswordbyid", {
      password,
      newPassword: passData.password,
      newCPassword: passData.cpassword,
      id,
      tokenid: data.tokens[0]._id,
    });
    console.log(response);

    if (response.data.type === "newPassword") {
      dispatch(removeLoader());
      dispatch(setAlert({ newPassword: response.data.err }));
      return;
    }
    if (response.data.type === "newCPassword") {
      dispatch(removeLoader());
      dispatch(setAlert({ newCPassword: response.data.err }));
      return;
    }
    if (response.data.type === "oldPassword") {
      dispatch(removeLoader());
      dispatch(setAlert({ oldPassword: response.data.err }));
      return;
    }
    dispatch(removeLoader());

    setIsUpdate(false);
  };
  function checkPasswordValidation(oldpassword, newpassword, newcpassword) {
    const err = {};
    if (!oldpassword) {
      err.oldPassword = "Please Enter The Password";
    }
    if (!newpassword) {
      err.newPassword = "Please Enter The New Password";
    }
    if (!newcpassword) {
      err.newCPassword = "Please Enter The Confirm Password";
    }
    return err;
  }

  return (
    <div className="update_name mb-3">
      {!isUpdate ? (
        <button onClick={() => setIsUpdate(true)} className="btn btn-secondary">
          Change Password
        </button>
      ) : (
        <div className="justify-content-between align-items-center py-2  px-3 ">
          <div id="oldpassword">
            <input
              className="form-control mb-3"
              type={`${showOldPassword ? "text" : "password"}`}
              placeholder="Old Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowOldPassword(!showOldPassword)}>
              {showOldPassword ? "Hide" : "Show"}
            </span>
            {alert.oldPassword && (
              <p className="text-danger alert_text">{alert.oldPassword}</p>
            )}
          </div>
          <div id="newpassword">
            <input
              className="form-control mb-3"
              type={`${showNewPassword ? "text" : "password"}`}
              name="password"
              placeholder="New Password"
              value={passData.password}
              onChange={handleChange}
            />
            <span onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? "Hide" : "Show"}
            </span>
            {alert.newPassword && (
              <p className="text-danger alert_text">{alert.newPassword}</p>
            )}
          </div>

          <div id="confirmpassword">
            <input
              className="form-control mb-3"
              type={`${showConfirmPassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm New Password"
              value={passData.cpassword}
              onChange={handleChange}
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
            {alert.newCPassword && (
              <p className="text-danger alert_text">{alert.newCPassword}</p>
            )}
          </div>
          <button onClick={handleSubmit} className="btn btn-success">
            Done
          </button>
          <button
            onClick={() => setIsUpdate(false)}
            className="btn btn-seconday"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeePassword;
