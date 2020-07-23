import React from "react";
import Layout from "../components/layout";
import { Link } from "react-router-dom";

const HomePage = () => (
  <Layout>
    <h1>This is a test!</h1>
    <div>
      <Link to="/projects" role="button">
        View Projects
      </Link>
    </div>
  </Layout>
);

export default HomePage;
