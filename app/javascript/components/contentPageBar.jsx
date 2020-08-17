import React from "react";
import styled from "styled-components";

import { getColor } from "helpers/style";

const StyledContentPageBar = styled.div`
  margin-top: 6rem;
  /* height: 6rem; */
  background-color: #f1f8ff;
  border: 1px solid #c8e1ff;
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

const ContentPageBar = ({ title, subtitle }) => {
  return (
    <StyledContentPageBar>
      <h3 className="dir-container">
        {" "}
        <span className="dir-title">{title}/</span>
        <span className="dir-subtitle">{subtitle}</span>
      </h3>
    </StyledContentPageBar>
  );
};

export default ContentPageBar;
