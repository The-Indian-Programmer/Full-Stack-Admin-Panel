import React, { useState } from "react";
import SendEmailMessage from "./SendEmailMessage";
import PasswordForm from "./PasswordForm";
import axios from "axios";
import { useHistory } from "react-router";
import { showLoader, removeLoader } from "../../action/index";
import { useDispatch } from "react-redux";
const ForgotPassword = () => {
  const [isEmailForm, setIsEmailForm] = useState(true);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateEmail(email);
    if (!isValid) {
      return alert("Invalid email");
    }
    if (isValid) {
      dispatch(showLoader());
      const response = await axios.post("/sendmail", { email });
      if (response.data.err) {
        dispatch(removeLoader());
        return alert(response.data.err);
      }
      dispatch(removeLoader());
      alert(response.data.msg);
      setCode(response.data.code);
      setIsEmailForm(false);
    }
  };
  return (
    <div className="forgot_password container mt-4">
      {isEmailForm ? (
        <SendEmailMessage
          handleEmailSubmit={handleEmailSubmit}
          email={email}
          setEmail={setEmail}
        />
      ) : (
        <PasswordForm code={code} email={email} />
      )}
    </div>
  );
};

export default ForgotPassword;
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
