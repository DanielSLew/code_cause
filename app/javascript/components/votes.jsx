import React, { useState } from "react";
import styled from "styled-components";
import { Star } from "react-feather";

import { getColor } from "helpers/palette";

const VoteBox = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
  border: 1px solid
    ${(props) =>
      props.isClicked ? getColor("successBorder") : getColor("lightBorder")};
  border-radius: 4px;
  transition: 0.15s all;
  background-color: ${(props) =>
    props.isClicked ? getColor("successHighlight") : getColor("white")};
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    background-color: ${(props) =>
      props.isClicked ? getColor("successHighlight") : getColor("white")};
    .vote-icon {
      color: ${(props) =>
        props.isClicked ? getColor("successDark") : getColor("secondary")};
    }
    .vote-text {
      color: ${(props) =>
        props.isClicked ? getColor("successDark") : getColor("secondary")};
    }
  }
  .vote-icon {
    display: flex;
    color: ${(props) =>
      props.isClicked ? getColor("success") : getColor("secondary")};
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    margin: 0.125rem;
    padding: 2px;
    transition: 0.2s all;
  }
  .vote-text {
    color: ${(props) =>
      props.isClicked ? getColor("success") : getColor("secondary")};
    font-weight: 500;
    margin-left: 0.25rem;
    transition: 0.2s all;
  }
`;

const Votes = ({ votes }) => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleClicked = (e) => setIsClicked(!isClicked);

  return (
    <VoteBox isClicked={isClicked} onClick={toggleClicked}>
      <Star className={`vote-icon`} />
      <p className="vote-text">{votes || "0"}</p>
    </VoteBox>
  );
};

export default Votes;
