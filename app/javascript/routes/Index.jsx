import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProjectsListing from "../components/projectsListing";
import Test from "../components/Test";

// Set up individual routes paths here
// Example:

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Test} />
      <Route path="/projects" exact component={ProjectsListing} />
    </Switch>
  </Router>
);
