import React from "react";
import styled from "styled-components";

import { getColor } from "helpers/palette";

const ListItem = styled.li`
  background-color: ${getColor("white")};
  width: 30rem;
  margin: 1rem;
  padding: 1rem 2rem;
  list-style: none;
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  transition: 0.2s all;
`;

const Project = ({ project }) => {
  return (
    <ListItem>
      <h2 className="project-name">{project.name}</h2>
      <p className="project-description">{project.description}</p>
      <p className="project-date">{project.date}</p>
    </ListItem>
  );
};

export default Project;
