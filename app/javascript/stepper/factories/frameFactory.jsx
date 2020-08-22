import React from "react";

import Message from "stepper/frames/message";
import SingleQA from "stepper/frames/singleQA";
import Results from "stepper/frames/results";
import { StyledFrame } from "stepper/frames/elements";

const getFrame = (type) => {
  const frame = {
    message: <Message />,
    results: <Results />,
    singleQA: <SingleQA />,
  };
  return frame[type];
};

const FrameFactory = ({ frameType }) => {
  return <StyledFrame>{getFrame(frameType)}</StyledFrame>;
};

export default FrameFactory;
