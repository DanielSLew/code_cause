import React, { useState, useEffect } from "react";
import Layout from "./layout";
import styled from "styled-components";
import Project from "./project";
import { getColor } from "../helpers";

const ListingSpace = styled.div`
  margin-top: 4vh;
  display: flex;
  justify-content: flex-start;
  .listing-section {
    .listing-title {
      font-size: calc(28px + 0.5vh + 1.5vw);
      margin-bottom: 4vh;
    }
  }
  .tag-section {
    margin-right: 6vw;
    background-color: ${getColor("white")};

    aside {
      height: 20rem;
      border-radius: 4px;
      width: 10rem;
      border: 1px solid ${getColor("lightBorder")};
    }
  }
`;

const ProjectsPage = () => {
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
    <Layout>
      <ListingSpace>
        <section className="tag-section">
          <aside className="worker-tags tags">
            <p>Filter By Skill Set</p>
            {/* WE'LL LIST OUT TAGS FOR EACH WORKER TYPE NEEDED HERE  */}
          </aside>
          <aside className="project-tags tags">
            <p>Filter By Project Type</p>
            {/* WE'LL LIST OUT TAGS FOR EACH PROJECT TYPE NEEDED HERE  */}
          </aside>
        </section>
        <section className="listing-section">
          <h1 className="listing-title">{projects.length} Projects!</h1>
          <ul>
            {projects &&
              projects.map((project) => {
                return <Project project={project} key={project.id} />;
              })}
          </ul>
        </section>
      </ListingSpace>
      {/* <button onClick={getProjects}> GET ASYNC PROJECTS </button> */}
    </Layout>
  );
};

export default ProjectsPage;
