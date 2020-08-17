import React, { useState } from "react";
import styled from "styled-components";

import { getColor } from "helpers/style";

const Paper = styled.div`
  background-color: ${getColor("white")};
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  border-top: none;
  color: rgba(41, 41, 41, 1);
  
  .paper-title {
    line-height: 48px;
    font-size: 3.2rem;
    font-weight: 300;
    margin: 0rem 6rem 3rem 4rem;
    padding-top: 3rem;
  }

  .section,
  .sub-section {
    padding: 1rem;
    line-height: 32px;
    font-size: 1.2rem;
    letter-spacing: -0.003em;
    /* color: rgba(41, 41, 41, 1); */
    font-style: normal;
    font-weight: 400;
    /* border-top: 1px solid ${getColor("lightBorder")}; */
  }

  .section {
    margin: 1rem 1rem 0rem 3rem;
    line-height: 40px;
  }
  .sub-section {
    margin: 0 1rem 1rem 5rem;
  }
  .heading {
    font-size: 1.8rem;
    letter-spacing: -0.022em;
    font-weight: 600;
    margin-bottom: 0.5rem;
    word-break: break-word;
    padding-right: 6rem;
  }
  .sub-heading {
    font-weight: 500;
  }
  p {
    padding-top: 0.5rem;
    padding-right: 6rem;
  }
  .editable {
    border-top: 1px solid rgba(0, 0, 0, 0);
    transition: 0.2s all;
  }
  .editable:hover {
    border-top: 1px solid ${getColor("lightBorder")};
  }
`;

const WhitePaper = ({ title, fields=[] }) => {

  return (
    <Paper>
      <h2 className="paper-title">{title}</h2>
      // {fields.map((field) => {
        return (
          <div key={field.id} className={field.type}>
            <h3
              className={`${
                field.type === "section" ? "heading" : "sub-heading"
              } editable`}
            >
              {field.label}
            </h3>
            <p className="response editable">{field.content}</p>
          </div>
        );
       })}
    </Paper>
  );
};

export default WhitePaper;
