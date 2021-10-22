import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { removeUser } from "../../action/index";
import Cookies from "js-cookie";
const Header = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(removeUser());
    Cookies.remove("auth");
    history.push("/");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Admin Panel
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {user === null ? (
              <li class="nav-item">
                <Link class="nav-link " aria-current="page" to="/signin">
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li onClick={logoutUser} class="nav-item">
                  <span
                    class="nav-link "
                    style={{ cursor: "pointer" }}
                    aria-current="page"
                    to="/signin"
                  >
                    Logout
                  </span>
                </li>
                <li
                  onClick={() => history.push(`/employee/${user._id}`)}
                  class="nav-item"
                >
                  <span
                    class="nav-link "
                    style={{ cursor: "pointer" }}
                    aria-current="page"
                    to="/signin"
                  >
                    Your Profile
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
