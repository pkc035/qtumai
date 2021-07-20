import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Map from "./pages/Map/Map";
import Where from "./pages/Where/Where";
import Login from "./pages/Login/Login";
import PhoneLogin from "./pages/Login/PhoneLogin";
import Signup from "./pages/Signup/Signup";
import SignupNext from "./pages/Signup/SignupNext/SignupNext";
import SignupPreference from "./pages/Signup/SignupNext/SignupPreference";
import Profile from "./pages/Profile/Profile";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Map" component={Map} />
          <Route exact path="/Where" component={Where} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/phonelogin" component={PhoneLogin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signup/next" component={SignupNext} />
          <Route exact path="/signup/preference" component={SignupPreference} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
