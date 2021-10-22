import React, { useEffect, useState } from "react";
import EmployeeName from "./EmployeeName";
import EmployeeEmail from "./EmployeeEmail";
import EmployeeAge from "./EmployeeAge";
import EmployeeGender from "./EmployeeGender";
import EmployeePassword from "./EmployeePassword";
import { useHistory, useParams } from "react-router";
import axios from "axios";
const EmployeeInfo = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const history = useHistory();
  useEffect(async () => {
    const response = await axios({
      method: "get",
      url: "/getemployeebyid",
      headers: { authorization: id },
    });
    if (response.data.err) {
      history.push("/");
      return;
    }

    setData(response.data.user);
  }, []);
  return (
    <div className="emp_info container mt-4">
      {data !== {} && (
        <>
          <EmployeeName data={data} id={id} />
          <EmployeeEmail data={data} id={id} />
          <EmployeeGender data={data} id={id} />
          <EmployeeAge data={data} id={id} />
          <EmployeePassword data={data} id={id} />
        </>
      )}
    </div>
  );
};

export default EmployeeInfo;
