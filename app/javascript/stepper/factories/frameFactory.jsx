import React from "react";
import styled from "styled-components";

import Message from "stepper/frames/message";
import SingleQA from "stepper/frames/singleQA";
import Results from "stepper/frames/results";
import { getColor } from "helpers/palette";

const StyledFrame = styled.div`
  border-top: 1px solid ${getColor("lightBorder")};
  color: rgba(41, 41, 41, 1);
  height: 100%;
  font-size: 1.1rem;
  margin-top: 4rem;
  padding: 2rem 2rem 0 2rem;
`;
//TODO: Frames should recieve all these props from context.
//Move all these props out of this component, and get the components
//to grab the props from the currentFrame objext in context.
const getFrame = ({
  type,
  details,
  title,
  subTitle,
  body,
  question,
  addData,
  input,
  validation,
  help,
  tag,
}) => {
  const frame = {
    message: <Message title={title} subTitle={subTitle} body={body} />,
    results: <Results title={title} />,
    singleQA: (
      <SingleQA
        addData={addData}
        question={question}
        title={title}
        details={details}
        subTitle={subTitle}
        input={input}
        validation={validation}
        help={help}
        tag={tag}
      />
    ),
  };
  return frame[type];
};

const FrameFactory = ({ frame }) => {
  return <StyledFrame>{getFrame(frame)}</StyledFrame>;
};

export default FrameFactory;
