import React from "react";
import Header from "../components/header";
import styled from "styled-components";
import { getColor } from "../helpers";

const StyleTemplate = styled.main`
  width: 1000px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  color: ${getColor("dark")};
`;

const Layout = (props) => {
  return (
    <>
      <Header />
      <StyleTemplate>{props.children}</StyleTemplate>
    </>
  );
};

export default Layout;
