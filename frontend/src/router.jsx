import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/home";
import Registration from "./views/registration";
import Login from "./views/login";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
