import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MessageSquare, Menu, List, Users } from "react-feather";

import { slideFromLeft, slideOutLeft } from "helpers/anims";
import { getColor } from "helpers/style";

import Chat from "components/chat";
import Index from "components/index";
import Contributors from "components/contributors";
import Button from "components/button";
import TabMenu from "components/tabMenu";

const SideBar = styled.div`
  width: ${(props) => props.width};
  height: 89.5vh;
  position: sticky;
  margin: 0;
  grid-column: 1;
  grid-row: 1;
  top: 0;
  left: 0%;
  animation: ${(props) => (props.anim ? slideOutLeft : slideFromLeft)} 0.3s
    ease-in-out both;
  box-shadow: 5px 5px 3px -3px rgba(89, 89, 89, 0.3);

  .dark-underlay {
    background-color: ${getColor("dark")};
    height: 6rem;
    width: 100%;
  }
  .interior {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: ${getColor("white")};
    height: 100%;
  }
  .close-button {
    height: 10%;
  }
`;

const Drawer = ({ width }) => {
  const [sidePanel, setSidePanel] = useState(true);
  const [anim, setAnim] = useState(false);

  const togglePanel = () => setSidePanel(!sidePanel);
  const handleClick = (e) => {
    e.stopPropagation();
    setAnim(!anim);
    setTimeout(() => togglePanel(), 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setAnim(false);
      setTimeout(() => togglePanel(), 200);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <>
      <Button
        className="open-button"
        content={<Menu />}
        fn={handleClick}
        height="4rem"
        bgColor={getColor("white")}
        border={`none`}
        selected={false}
      />

      <SideBar anim={anim} width={width}>
        <TabMenu
          closeDrawer={handleClick}
          options={[
            {
              value: "chat",
              tabContent: <MessageSquare />,
              render: <Chat />,
            },
            {
              value: "index",
              tabContent: <List value="index" />,
              render: <Index />,
            },
            {
              value: "contributors",
              tabContent: <Users value="contributors" />,
              render: <Contributors />,
            },
          ]}
        />
        {/* <Button
              type={"side-tab"}
              content={<Users className="button-bar-icon" />}
              color={getColor("lightgrey")}
              bgColor={getColor("dark")}
              width={buttonWidth}
              height={buttonWidth}
              radius="0"
              border={`1px dotted ${getColor("dark")}`}
            /> */}
      </SideBar>
    </>
  );
};

export default Drawer;
