import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import HomePage from "./component/HomePage/HomePage";
import CreateEmployee from "./component/CreateEmployee/CreateEmployee";
import EditEmployee from "./component/EditEmployee/EditEmployee";
import Signin from "./component/SignIn/Signin";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setUser } from "./action/index";
import EmployeeInfo from "./component/EmployeeInfo/EmployeeInfo";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword";
import GlobalLoader from "./component/GlobalLoader/GlobalLoader";
import VerifyMail from "./component/VerifyMail/VerifyMail";
function App() {
  const user = useSelector((state) => state.user);
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  useEffect(async () => {
    const token = Cookies.get("auth");
    const response = await axios({
      method: "get",
      url: "/getemployeebytoken",
      headers: { authorization: token },
    });
    if (response.data.err) {
      return alert(response.data.err);
    }
    console.log(response);
    dispatch(setUser(response.data.user));
  }, []);
  return (
    <div className="app">
      <Router>
        {loader && <GlobalLoader />}
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/create">
            <CreateEmployee />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/employee/:id">
            <EmployeeInfo />
          </Route>

          <Route exact path="/edit/:id">
            <EditEmployee />
          </Route>

          <Route exact path="/forgotpassword">
            <ForgotPassword />
          </Route>

          <Route exact path="/verifymail/:token">
            <VerifyMail />
          </Route>

          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
