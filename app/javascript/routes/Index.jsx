import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Set up individual routes paths here
// Example:

import Test from "../components/Test";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Test} />
    </Switch>
  </Router>
);