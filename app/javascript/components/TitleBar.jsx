import React from "react";
import styled from "styled-components";

import { getColor } from "helpers/palette";

const StyledTitleBar = styled.div`
  background-color: ${getColor("primaryBG")};
  border: 1px solid ${getColor("primaryLight")};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  .dir-container {
    margin: auto 2rem auto 4rem;
    padding: 2rem 0;
  }
  .dir-subtitle,
  .dir-title {
    color: ${getColor("primary")};
    font-size: 1.5rem;
    font-weight: 400;
  }

  .dir-subtitle {
    font-weight: 500;
  }
`;

const TitleBar = ({ title, creators }) => {
  //TODO make creators into a singular creator
  const creator = creators.length ? creators[0].name : "unknownCreator";
  return (
    <StyledTitleBar>
      <h3 className="dir-container">
        {" "}
        <span className="dir-title">{title || "unknownTitle"}/</span>
        <span className="dir-subtitle">{creator}</span>
      </h3>
    </StyledTitleBar>
  );
};

export default TitleBar;
