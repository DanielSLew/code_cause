import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heart, Tag, Search } from "react-feather";

import TabMenu from "components/tabMenu";
import Tab from "components/tab";
import Layout from "layouts/layout";
import Project from "components/project";
import { getColor } from "helpers/palette";

const ListingSpace = styled.div`
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

  const sideMenu = (
    <TabMenu
      options={[
        {
          value: "index",
          tabButton: <Search value="search" />,
          tabCard: <Tab content="Search For Projects" />,
        },
        {
          value: "chat",
          tabButton: <Tag value="tags" />,
          tabCard: <Tab content="Search By Tags" />,
        },
        {
          value: "contributors",
          tabButton: <Heart value="likedProjects" />,
          tabCard: <Tab content="Liked Projects" />,
        },
      ]}
    />
  );

  return (
    <Layout sideMenu={sideMenu}>
      <ListingSpace>
        {/* <section className="tag-section">
          <aside className="worker-tags tags">
            <p>Filter By Skill Set</p>
          </aside>
          <aside className="project-tags tags">
            <p>Filter By Project Type</p>
          </aside>
        </section> */}
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
