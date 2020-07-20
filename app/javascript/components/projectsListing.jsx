import React, { useState } from "react";

const ProjectsListing = () => {
  const [projects, setProjects] = useState([]);

  function parseJSON(response) {
    return response.json();
  }

  function get_projects() {
    return fetch("/api/v1/projects", {
      accept: "application/json",
    }).then(parseJSON);
  }

  const getProjects = async () => {
    const response = await fetch("/api/v1/projects", {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div>
      <h1>Projects!</h1>
      {projects &&
        projects.map((project) => {
          console.log(project);
        })}
      <button onClick={getProjects}> GET ASYNC PROJECTS </button>
      <button onClick={get_projects}> GET FETCH PROJECTS </button>
    </div>
  );
};

export default ProjectsListing;
