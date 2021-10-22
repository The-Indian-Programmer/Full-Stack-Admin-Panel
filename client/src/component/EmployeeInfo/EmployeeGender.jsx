import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader, removeLoader } from "../../action/index";
const EmployeeGender = ({ data, id }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [gender, setGender] = useState(data.gender);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    dispatch(showLoader());
    const response = await axios.post("/updateemployeegenderbyid", {
      gender,
      id,
    });
    if (response.data.err) {
      dispatch(removeLoader());

      return alert(response.data.err);
    }
    dispatch(removeLoader());
    setIsUpdate(false);
    alert(response.data.message);
  };
  return (
    <div className="update_gender mb-3">
      {!isUpdate ? (
        <div
          style={{ borderRadius: "5px" }}
          className="d-flex justify-content-between align-items-center py-2  border-2 border px-3"
        >
          <span className="emp_name">{data.gender}</span>
          <button onClick={() => setIsUpdate(true)} className="btn btn-danger">
            Edit
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center py-2  px-3 ">
          <select
            value={gender}
            onChange={handleChange}
            name="gender"
            className="form-select mb-3"
            aria-label="Role"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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

export default EmployeeGender;
