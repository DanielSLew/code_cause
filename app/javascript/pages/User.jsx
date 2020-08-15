import React from "react";
import styled from "styled-components";
// import { formatDistanceToNow, parseISO } from "date-fns";

// import { getColor } from "helpers/style";
import UserContext from 'contexts/userContext';

import Layout from "layouts/index";
import ProjectBar from "components/projectBar";
import Drawer from "components/drawer";
// import SearchInput from "components/searchInput";
// import Votes from "components/votes";
// import Avatar from "components/avatar";
// import Tag from "components/tag";
// import Button from "components/button";
// import TagListing from "components/tagListing";

const StyledUserPage = styled.div`
  /* position: relative; */
  display: grid;
  grid-template-columns: ${(props) => props.sideBarWidth} minmax(auto, 50px) ${(
      props
    ) => props.projectWidth} auto;
`;
const ProjectSpace = styled.div`
  width: ${(props) => props.width};
  margin: 0;
  grid-column: 3/4;
  grid-row: 1;
`;

const UserPage = () => {
  const sideBarWidth = "400px";
  const projectWidth = "1000px";
  return (
    <Layout>
      <StyledUserPage
        sideBarWidth={sideBarWidth}
        ProjectSpace={projectWidth}
      >
        <Drawer width={"400px"} />
        <ProjectSpace width={projectWidth}>
          <ProjectBar />
          <WhitePaper />
        </ProjectSpace>
      </StyledUserPage>
    </Layout>
  );
};

export default UserPage;
