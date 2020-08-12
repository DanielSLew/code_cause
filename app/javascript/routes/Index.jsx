import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../../app/assets/stylesheets/globalStyles.css";
import ProjectsPage from "../components/ProjectsPage";
import HomePage from "../components/HomePage";
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';

// Set up individual routes paths here
// Example:

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/projects" exact component={ProjectsPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/signup" exact component={SignUpPage} />
    </Switch>
  </Router>
);

export default Routes
