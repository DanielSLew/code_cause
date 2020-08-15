import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../../app/assets/stylesheets/globalStyles.css";

import ProjectsPage from "pages/Projects";
import HomePage from "pages/Home";


// Set up individual routes paths here
// Example:

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/projects" exact component={ProjectsPage} />

    </Switch>
  </Router>
);

export default Routes
