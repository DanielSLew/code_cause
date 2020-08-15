import React from "react";
import styled from "styled-components";

import { getColor } from "helpers/style";

const StyledProjectBar = styled.div`
  margin-top: 6rem;
  /* height: 6rem; */
  background-color: #f1f8ff;
  border: 1px solid #c8e1ff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  .dir-title {
    margin: auto 2rem auto 4rem;
    padding: 2rem 0;
  }
  .dir-projectname,
  .dir-username {
    color: ${getColor("primary")};
    font-size: 1.5rem;
    font-weight: 400;
  }

  .dir-projectname {
    font-weight: 500;
  }
`;

const ProjectBar = () => {
  return (
    <StyledProjectBar>
      <h3 className="dir-title">
        {" "}
        <span className="dir-username">Username/</span>
        <span className="dir-projectname">ProjectName</span>
      </h3>
    </StyledProjectBar>
  );
};

export default ProjectBar;
