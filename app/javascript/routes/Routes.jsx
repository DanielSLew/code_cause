import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../../app/assets/stylesheets/globalStyles.css";

import ProjectsListingPage from "pages/ProjectsListing";
import ProjectPage from "pages/Project";
import HomePage from "pages/Home";
import UserPage from "pages/User";

// Set up individual routes paths here
// Example:

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/projects" exact component={ProjectsListingPage} />
      <Route path="/project/:projectId" component={ProjectPage} />
      <Route path="/user" exact component={UserPage} />
    </Switch>
  </Router>
);

export default Routes;
