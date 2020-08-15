import React, { useState, useContext } from "react";
import styled from "styled-components";

import { getColor } from "helpers/style";

import { ModalContext, ModalProvider } from 'contexts/modalContext';

import Header from "layouts/header";
import Modal from "components/modal";

const StyleTemplate = styled.main`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  color: ${getColor("dark")};
`;

const Layout = (props) => {
  const { modal } = useContext(ModalContext);

  return (
    <>
      {modal && <Modal/>}
      <Header/>
      <StyleTemplate>{props.children}</StyleTemplate>
    </>
  );
};

export default Layout;
