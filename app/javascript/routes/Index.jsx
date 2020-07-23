import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../../app/assets/stylesheets/globalStyles.css";
import ProjectsPage from "../components/ProjectsPage";
import HomePage from "../components/HomePage";

// Set up individual routes paths here
// Example:

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/projects" exact component={ProjectsPage} />
    </Switch>
  </Router>
);
