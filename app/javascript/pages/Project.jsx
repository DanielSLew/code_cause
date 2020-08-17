import React from "react";
import styled from "styled-components";

import getFakeQAs from "helpers/seedData";
import ContentPage from "layouts/contentPage";


const ProjectPage = () => {
  return (
    <ContentPage
      title="ProjectName"
      subtitle="Creator"
      content={getFakeQAs}
    />
  );
};

export default ProjectPage;
