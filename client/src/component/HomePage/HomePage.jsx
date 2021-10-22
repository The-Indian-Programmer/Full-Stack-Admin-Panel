import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import EmployeeItem from "./EmployeeItem/EmployeeItem";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, removeLoader } from "../../action/index";
const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [empData, setEmpData] = useState([]);
  useEffect(async () => {
    const response = await axios.get("/getallemployee");
    setEmpData(response.data.data);
  }, []);

  const deleteEmployee = async (id) => {
    dispatch(showLoader());
    const response = await axios({
      method: "get",
      url: "/deleteemployeebyid",
      headers: { authorization: id },
    });
    if (response.err) {
      dispatch(removeLoader());
      return alert("Error: " + response.err);
    }
    let newData = empData.filter((item) => {
      return item._id !== id;
    });
    dispatch(removeLoader());
    setEmpData(newData);
  };
  return (
    <div className="container home mt-4 w-full ">
      {user === null ? (
        <h1 className="text-center">You Are Not Logged In</h1>
      ) : user.role === "admin" ? (
        <h1 className="text-center">You Are Logged In As Admin</h1>
      ) : (
        <h1 className="text-center">You Are Logged In As Employee</h1>
      )}

      <hr />
      <div className="top d-flex justify-content-evenly  align-items-center">
        <h5>All Employees</h5>

        {user !== null
          ? user.role === "admin" && (
              <button
                onClick={() => history.push("/create")}
                className="btn  btn-primary"
              >
                New +{" "}
              </button>
            )
          : ""}
      </div>

      {/* All Employees data in table  */}
      <table class="table table-striped table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Role</th>
            {/* First check user if loggedin or not. I am checking here with redux if user if logged in user's data should be in redux else user's data should be null */}
            {user !== null
              ? user.role === "admin" && <th scope="col">Actions</th>
              : ""}
            {user !== null ? <th scope="col">Is Varified</th> : ""}
          </tr>
        </thead>
        <tbody>
          {empData.map((emp, index) => {
            return (
              <EmployeeItem
                key={emp._id}
                data={emp}
                index={index}
                deleteEmployee={deleteEmployee}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
