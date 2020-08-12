import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { fadeIn, fadeOut, slideUp, slideDown } from "../anims";
import { ModalContext } from '../contexts/modalContext';
import { X } from "react-feather";
import Button from "./button";
import Input from "./Input";
import { getColor } from "../helpers";
import Backdrop from "./backdrop";

const WarnBox = styled.div`
  position: fixed;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-radius: 4px;
  background-color: #ffffff;
  width: 35rem;
  padding: 1.5rem;
  z-index: 20;
  animation: ${(props) => (props.fadeIn ? fadeIn : fadeOut)} 0.2s ease-in-out
      both,
    ${(props) => (props.fadeIn ? slideUp : slideDown)} 0.2s ease-in-out both;
  .title-wrapper {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${getColor("lightBorder")};
    padding-right: 1.5rem;
  }
  .warn-title {
    text-align: center;
    font-weight: 300;
    font-size: 3rem;
    margin-bottom: 2rem;
    letter-spacing: -2px;
    letter-spacing: -2px;
    z-index: 25;
  }
  .body-text {
    font-size: 0.9rem;
    padding: 0.5rem 2rem;
    border-bottom: 1px solid ${getColor("lightBorder")};
  }
  .warning-section-subtext {
    padding: 0.5rem 0;
    margin: 0;
  }
  .x-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }

  .button-section {
    display: flex;
    justify-content: center;
    margin: 2rem 1.5rem 0rem 1.5rem;
    padding-right: 1.5rem;
    button {
      margin: 0 0.8rem;
    }
  }
`;

const Warning = () => {
  const [isFading, setIsOpening] = useState(true);
  const { toggleModal, modalContent, setModalContent } = useContext(ModalContext);
  const handleClick = (e) => {
    setIsOpening(false);
    setTimeout(() => toggleModal(), 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsOpening(false);
      setTimeout(() => toggleModal(), 200);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <Backdrop fadeIn={isFading} handleClick={handleClick}>
      <WarnBox fadeIn={isFading}>
        <X className="x-icon" onClick={handleClick} />
        <modalContent.content />
      </WarnBox>
    </Backdrop>
  );
};
export default Warning;
