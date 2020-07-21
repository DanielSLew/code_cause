import React from "react";
import styled from "styled-components";

const ListItem = styled.li`
  background-color: blue;
`;

const Project = ({ project }) => {
  return (
    <ListItem>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>{project.body}</p>
      <p>{project.date}</p>
    </ListItem>
  );
};

export default Project;
