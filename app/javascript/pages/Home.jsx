import React from "react";
import { Link } from "react-router-dom";

import { ModalProvider } from 'contexts/modalContext';

import Layout from "layouts/index";

const HomePage = () => (

  <ModalProvider>
    <Layout>
      <h1>This is a test!</h1>
      <div>
        <Link to="/projects" role="button">
          View Projects
        </Link>
      </div>
    </Layout>
  </ModalProvider>
);

export default HomePage;
