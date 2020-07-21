import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Project from "../components/project";

const ProjectsListing = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getProjects = async () => {
      const response = await fetch("/api/v1/projects", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();
      setProjects(json);
    };

    getProjects();
  }, []);

  return (
    <div>
      <h1>Projects!</h1>
      <ul>
        {projects &&
          projects.map((project) => {
            return <Project project={project} key={project.id} />;
          })}
      </ul>
      {/* <button onClick={getProjects}> GET ASYNC PROJECTS </button> */}
    </div>
  );
};

export default ProjectsListing;
