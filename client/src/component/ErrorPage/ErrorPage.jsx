import React from "react";
import { useHistory } from "react-router";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="container my-4 py-4">
      <h1 className="text-center">404 Page</h1>
      <button
        onClick={() => history.push("/")}
        className="btn btn-secondary m-auto d-block"
      >
        Back To Home
      </button>
    </div>
  );
};

export default ErrorPage;
