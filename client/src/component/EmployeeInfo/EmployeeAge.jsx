import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader, removeLoader } from "../../action/index";
const EmployeeAge = ({ data, id }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [age, setAge] = useState(data.age);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = async (e) => {
    dispatch(showLoader());
    const response = await axios.post("/updateemployeeagebyid", {
      age,
      id,
    });
    console.log(response);
    if (response.data.err) {
      dispatch(removeLoader());
      return alert(response.data.err);
    }
    dispatch(removeLoader());
    setIsUpdate(false);
    alert(response.data.message);
  };
  return (
    <div className="update_email mb-3">
      {!isUpdate ? (
        <div
          style={{ borderRadius: "5px" }}
          className="d-flex justify-content-between align-items-center py-2  border-2 border px-3"
        >
          <span className="emp_name">{data.age}</span>
          <button onClick={() => setIsUpdate(true)} className="btn btn-danger">
            Edit
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center py-2  px-3 ">
          <input
            className="form-control mx-3"
            type="number"
            placeholder="your Age"
            value={age}
            onChange={handleChange}
          />
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

export default EmployeeAge;
