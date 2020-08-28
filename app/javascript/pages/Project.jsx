import React, { useEffect, useState } from "react";
import { MessageSquare, List, Users } from "react-feather";

import { useParams } from "react-router-dom";
import { getProject } from "actions/project";
import Layout from "layouts/layout";
import TitleBar from "components/TitleBar";
import TabMenu from "components/tabMenu";
import Tab from "components/tab";
import WhitePaper from "layouts/whitePaper";

const ProjectsPage = () => {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  console.log(projectId);
  useEffect(() => {
    getProject({ setState: setProject, id: parseInt(projectId) });
  }, []);
  console.log(project);
  const sideMenu = (
    <TabMenu
      options={[
        {
          value: "index",
          tabButton: <List value="index" />,
          tabCard: <Tab content="Index" />,
        },
        {
          value: "chat",
          tabButton: <MessageSquare />,
          tabCard: <Tab content="Chat" />,
        },
        {
          value: "contributors",
          tabButton: <Users value="contributors" />,
          tabCard: <Tab content="Contributors" />,
        },
      ]}
    />
  );

  return (
    <Layout sideMenu={sideMenu}>
      {project !== null && (
        <>
          <TitleBar title={project.name} creators={project.creators} />
          <WhitePaper
            fields={JSON.parse(project.body) || null}
            title={project.name}
          />
        </>
      )}
    </Layout>
  );
};

export default ProjectsPage;
