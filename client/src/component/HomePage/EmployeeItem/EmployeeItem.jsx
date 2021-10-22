import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { showLoader, removeLoader } from "../../../action/index";

const EmployeeItem = ({ data, index, deleteEmployee }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const sendVarificationMail = async (email, token) => {
    const checkEmail = validateEmail(email);
    if (!checkEmail) {
      return alert("Email is not valid");
    }
    dispatch(showLoader());
    const response = await axios.post("/sendvarificationmail", {
      email,
      token,
    });
    if (response.data.err) {
      dispatch(removeLoader());
      return alert(response.data.err);
    }
    dispatch(removeLoader());
    alert(response.data.msg);
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td className="text-uppercase">{data.age}</td>
      <td className="text-uppercase">{data.gender}</td>
      <td className="text-uppercase">{data.role}</td>
      {/* First check user if loggedin or not. I am checking here with redux if user is logged in user's data should be in redux else user's data should be null */}
      {/* user should be logged in and user should be admin  */}
      {/* LINE 39 To 50 */}
      {user !== null
        ? user.role === "admin" && (
            <td>
              <button
                onClick={() => deleteEmployee(data._id)}
                className="btn btn-danger mx-2"
              >
                Delete
              </button>
            </td>
          )
        : ""}

      <td className="text-uppercase">
        {/* First check user if loggedin or not. I am checking here with redux if user is logged in user's data should be in redux else user's data should be null */}
        {user !== null ? (
          data.isVarified ? (
            // if user is varified we will show varifind text otherwise we will show not varifind with red text and an send varification mail which is visible only for admin
            <p className="text-success">Varified</p>
          ) : (
            <span className="d-flex align-items-center justify-content-between">
              <p className="text-danger">Not Varified</p>
              {user.role === "admin" && (
                <button
                  onClick={() =>
                    sendVarificationMail(data.email, data.tokens[0].token)
                  }
                  className="btn btn-primary"
                >
                  Send Mail
                </button>
              )}
            </span>
          )
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default EmployeeItem;
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
