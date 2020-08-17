import React from "react";
import styled from "styled-components";

import Layout from "layouts/index";
import ContentPageBar from "components/contentPageBar";
import Drawer from "components/drawer";
import WhitePaper from "layouts/whitePaper";

const StyledContentPage = styled.div`
  /* position: relative; */
  display: grid;
  grid-template-columns: ${(props) => props.sideBarWidth} minmax(auto, 50px) ${(
      props
    ) => props.contentWidth} auto;
`;
const ContentSpace = styled.div`
  width: ${(props) => props.width};
  margin: 0;
  grid-column: 1/4;
  grid-row: 1;
`;

const ContentPage = ({ title, subtitle, content }) => {
  const sideBarWidth = "400px";
  const contentWidth = "1000px";
  return (
    <Layout>
      <StyledContentPage
        sideBarWidth={sideBarWidth}
        contentSpace={contentWidth}
      >
        <Drawer width={"400px"} />
        <ContentSpace width={contentWidth}>
          <ContentPageBar title={title} subtitle={subtitle} />
          <WhitePaper content={content} title={title} />
        </ContentSpace>
      </StyledContentPage>
    </Layout>
  );
};

export default ContentPage;
