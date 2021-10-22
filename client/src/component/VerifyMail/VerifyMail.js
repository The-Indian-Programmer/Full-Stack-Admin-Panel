import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { showLoader, removeLoader } from "../../action/index";
import axios from "axios";
import { useEffect, useState } from "react";
const VerifyMail = () => {
  const [verifyText, setVerifyText] = useState("Verifying ....");
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(async () => {
    dispatch(showLoader());
    const response = await axios.post("/verifymail", { token });
    if (response.data.err) {
      setVerifyText("Email could not be verified");
      dispatch(removeLoader());
      return alert(response.data.err);
    }
    alert(response.data.msg);
    setVerifyText("Email Verified");

    dispatch(removeLoader());
    history.push("/");
  }, [token]);

  return (
    <div className="verifymail container mt-4 py-4">
      <h1 className="text-center">{verifyText}</h1>
    </div>
  );
};

export default VerifyMail;
