import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <h1>This is a test!</h1>
    <div>
      <Link
        to="/projects"
        role="button"
      >
        View Projects
      </Link>
    </div>
  </div>
);