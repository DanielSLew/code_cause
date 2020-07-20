import React from "react";
import { Link } from "react-router-dom";

console.log("ran");
const Test = () => (
  <div>
    <h1>This is a test!</h1>
    <div>
      <Link to="/projects" role="button">
        View Projects
      </Link>
    </div>
  </div>
);

export default Test;
