import React, { useState, useContext } from "react";
import Header from "./header";
import Modal from "./modal";
import styled from "styled-components";
import { getColor } from "../helpers";
import { ModalContext } from '../contexts/modalContext';

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
