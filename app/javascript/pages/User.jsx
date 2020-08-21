import React from "react";
import { MessageCircle, BarChart2, Briefcase } from "react-feather";

import Layout from "layouts/layout";
import TitleBar from "components/TitleBar";
import TabMenu from "components/tabMenu";
import Tab from "components/tab";
import WhitePaper from "layouts/whitePaper";
import { getFakeQAs } from "helpers/seedData";

const UserPage = () => {
  const sideMenu = (
    <TabMenu
      options={[
        {
          value: "chat",
          tabButton: <MessageCircle value="msg" />,
          tabCard: <Tab content="Message User" />,
        },
        {
          value: "index",
          tabButton: <BarChart2 value="award" />,
          tabCard: <Tab content="See user's stats" />,
        },
        {
          value: "contributors",
          tabButton: <Briefcase value="" />,
          tabCard: <Tab content="Active Projects" />,
        },
      ]}
    />
  );

  return (
    <Layout sideMenu={sideMenu}>
      <TitleBar title="Jordan Lesich" subtitle="Developer" />
      <WhitePaper fields={getFakeQAs()} />
    </Layout>
  );
};

export default UserPage;
