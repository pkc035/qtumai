import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Detail from "./pages/Detail/Detail";
import Map from "./pages/Map/Map";
import Likes from "./pages/Likes/Likes";
import Who from "./pages/Who/Who";
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
          <Route exact path="/shops/detail/:id" component={Detail} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/likes" component={Likes} />
          <Route exact path="/where" component={Where} />
          <Route exact path="/who" component={Who} />
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
