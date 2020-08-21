import React from "react";
import { MessageSquare, List, Users } from "react-feather";

import Layout from "layouts/layout";
import TitleBar from "components/TitleBar";
import TabMenu from "components/tabMenu";
import Tab from "components/tab";
import WhitePaper from "layouts/whitePaper";
import { getFakeQAs } from "helpers/seedData";

const ProjectsPage = () => {
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
  // console.log(sideMenu());
  return (
    <Layout sideMenu={sideMenu}>
      <TitleBar />
      <WhitePaper fields={getFakeQAs()} title={"Project"} />
    </Layout>
  );
};

export default ProjectsPage;
