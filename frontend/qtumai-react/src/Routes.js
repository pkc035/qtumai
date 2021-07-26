import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Detail from "./pages/Detail/Detail";
import Map from "./pages/Map/Map";
import Heart from "./pages/Heart/Heart";
import Likes from "./pages/Likes/Likes";
import Who from "./pages/Who/Who";
import Where from "./pages/Where/Where";
import Login from "./pages/Login/Login";
import PhoneLogin from "./pages/Login/PhoneLogin";
import Signup from "./pages/Signup/Signup";
import SignupNext from "./pages/Signup/SignupNext/SignupNext";
import SignupPreference from "./pages/Signup/SignupNext/SignupPreference";
import Profile from "./pages/Profile/Profile";
import BusinessApplication from "./pages/Profile/ProfileScreens/BusinessApplication";
import BusinessManagement from "./pages/Profile/ProfileScreens/BusinessManagement";
import NotificationSetting from "./pages/Profile/ProfileScreens/NotificationSetting";
import ProfileEdit from "./pages/Profile/ProfileScreens/ProfileEdit";
import ServiceCenter from "./pages/Profile/ProfileScreens/ServiceCenter";
import StoreApplication from "./pages/Profile/ProfileScreens/StoreApplication";
import StoreHistory from "./pages/Profile/ProfileScreens/StoreHistory";
import Subscription from "./pages/Profile/ProfileScreens/Subscription";
import ViewMore from "./pages/Profile/ProfileScreens/ViewMore";
import BadgeManagement from "./pages/Profile/ProfileScreens/BusinessManagement/BadgeManagement";
import BenefitManagement from "./pages/Profile/ProfileScreens/BusinessManagement/BenefitManagement";
import CustomerAnalysis from "./pages/Profile/ProfileScreens/BusinessManagement/CustomerAnalysis";
import BadgeDescription from "./pages/Profile/ProfileScreens/ViewMore/BadgeDescription";
import BusinessPartnership from "./pages/Profile/ProfileScreens/ViewMore/BusinessPartnership";
import Roadpick from "./pages/Profile/ProfileScreens/ViewMore/Roadpick";
import Terms from "./pages/Profile/ProfileScreens/ViewMore/Terms";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/shops/detail/:id" component={Detail} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/heart" component={Heart} />
          <Route exact path="/likes" component={Likes} />
          <Route exact path="/where" component={Where} />
          <Route exact path="/who" component={Who} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/phonelogin" component={PhoneLogin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signup/next" component={SignupNext} />
          <Route exact path="/signup/preference" component={SignupPreference} />
          <Route exact path="/profile" component={Profile} />
          <Route
            exact
            path="/profile/businessapplication"
            component={BusinessApplication}
          />
          <Route
            exact
            path="/profile/businessmanagement"
            component={BusinessManagement}
          />
          <Route
            exact
            path="/profile/notificationsetting"
            component={NotificationSetting}
          />
          <Route exact path="/profile/profileedit" component={ProfileEdit} />
          <Route
            exact
            path="/profile/servicecenter"
            component={ServiceCenter}
          />
          <Route
            exact
            path="/profile/storeapplication"
            component={StoreApplication}
          />
          <Route exact path="/profile/storehistory" component={StoreHistory} />
          <Route exact path="/profile/subscription" component={Subscription} />
          <Route exact path="/profile/viewmore" component={ViewMore} />
          <Route
            exact
            path="/profile/businessmanagement/badgemanagement"
            component={BadgeManagement}
          />
          <Route
            exact
            path="/profile/businessmanagement/benefitmanagement"
            component={BenefitManagement}
          />
          <Route
            exact
            path="/profile/businessmanagement/customeranalysis"
            component={CustomerAnalysis}
          />
          <Route
            exact
            path="/profile/viewmore/badgedescription"
            component={BadgeDescription}
          />
          <Route
            exact
            path="/profile/viewmore/businesspartnership"
            component={BusinessPartnership}
          />
          <Route exact path="/profile/viewmore/roadpick" component={Roadpick} />
          <Route exact path="/profile/viewmore/terms" component={Terms} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
