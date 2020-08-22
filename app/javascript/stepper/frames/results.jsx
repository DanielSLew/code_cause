import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "contexts/StepperContext";
import Button from "components/button";
import { Title } from "stepper/frames/elements";

const MessageFrame = styled.div`
  position: relative;
  height: 100%;

  .list {
    list-style: square;
    margin-left: 1.5rem;

    li {
      margin: 0.5rem 0;
    }
  }
  .next-button {
    position: absolute;
    bottom: 4rem;
    right: 0;
  }
`;

const Message = () => {
  const { steps, currentFrame } = useContext(StepperContext);
  return (
    <MessageFrame>
      <Title>{currentFrame.title}</Title>
      {/* {steps.map((step, i) => {
        return (
          <div key={i}>
            <SubTitle>{step.question}</SubTitle>
            <Details>{step.answer}</Details>
          </div>
        );
      })} */}

      <Button
        content="(Dummy)"
        height="3rem"
        width="10rem"
        className="next-button primary"
      />
    </MessageFrame>
  );
};

export default Message;
