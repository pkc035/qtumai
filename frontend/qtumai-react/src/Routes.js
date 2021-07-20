import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Detail from "./pages/Detail/Detail";
import Map from "./pages/Map/Map";
import Where from "./pages/Where/Where";
import Review from "./pages/Review/Review";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Detail" component={Detail} />
          <Route exact path="/Map" component={Map} />
          <Route exact path="/Where" component={Where} />
          <Route exact path="/Review" component={Review} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
