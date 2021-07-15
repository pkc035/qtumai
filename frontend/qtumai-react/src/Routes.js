import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Map from "./pages/Map/Map";
import Where from "./pages/Where/Where";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Map" component={Map} />
          <Route exact path="/Where" component={Where} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
