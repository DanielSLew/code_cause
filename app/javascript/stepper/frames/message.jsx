import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "contexts/StepperContext";
import { Title, MsgText } from "stepper/frames/elements";

const MessageFrame = styled.div`
  position: relative;

  .list {
    list-style: square;
    margin-left: 1.5rem;

    li {
      margin: 0.5rem 0;
    }
  }
`;

const Message = () => {
  const { currentFrame } = useContext(StepperContext);
  const { title, subTitle, body } = currentFrame;

  return (
    <MessageFrame>
      <Title>{title}</Title>
      {subTitle && <MsgText> {subTitle} </MsgText>}
      {body && (
        <div className="body-text">
          {body.type === "list" ? (
            <ul className="list">
              {body.strings.map((str, i) => (
                <li key={i}>{str}</li>
              ))}
            </ul>
          ) : (
            body.strings.map((str, i) => <p key={i}>{str}</p>)
          )}
        </div>
      )}
    </MessageFrame>
  );
};

export default Message;
