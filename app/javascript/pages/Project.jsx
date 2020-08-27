import React, { useEffect, useState } from "react";
import { MessageSquare, List, Users } from "react-feather";

import { getProject } from "actions/project";
import Layout from "layouts/layout";
import TitleBar from "components/TitleBar";
import TabMenu from "components/tabMenu";
import Tab from "components/tab";
import WhitePaper from "layouts/whitePaper";
import { getFakeQAs } from "helpers/seedData";

const id = 51;

const ProjectsPage = () => {
  const [project, setProject] = useState(null);
  useEffect(() => {
    getProject({ setState: setProject, id });
  }, []);

  console.log(project === null ? "loading" : project.body);
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
      {/* {project !== null && (
        <>
          <TitleBar />
          <WhitePaper fields={JSON.parse(project.body)} title={project.name} />
        </>
      )} */}
    </Layout>
  );
};

export default ProjectsPage;
