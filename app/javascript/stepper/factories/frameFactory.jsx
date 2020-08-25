import React, { useContext } from "react";
import { X } from "react-feather";
import { StepperContext } from "contexts/StepperContext";
import Message from "stepper/frames/message";
import SingleQA from "stepper/frames/singleQA";
import Results from "stepper/frames/results";
import Button from "components/button";
import NextFrameButton from "stepper/factories/nextFrameButton";
import Help from "stepper/help";
import { ChevronLeft, ChevronRight } from "react-feather";
import { FrameTemplate } from "stepper/frames/elements";

const getFrame = (type) => {
  const frame = {
    message: <Message />,
    results: <Results />,
    singleQA: <SingleQA />,
  };
  return frame[type];
};

const FrameFactory = ({ frameType, exitStepper }) => {
  const {
    prev,
    next,
    cannotMoveBackward,
    cannotMoveForward,
    currentFrame,
  } = useContext(StepperContext);

  return (
    <FrameTemplate>
      <Button
        content={<X size="1.5rem" />}
        height="3rem"
        width="3rem"
        className="secondary x-button"
        fn={exitStepper}
      />
      {getFrame(frameType)}
      <div className="sub-input-section">
        {currentFrame.help && <Help helpText={currentFrame.help} />}
      </div>
      <div className="nav-buttons">
        <Button
          content={<ChevronLeft size="1.5rem" />}
          className="secondary"
          fn={prev}
          disabled={cannotMoveBackward()}
          height="3rem"
          width="3rem"
        />
        <div className="next-area">
          <NextFrameButton exitStepper={exitStepper} />
          <Button
            content={<ChevronRight size="1.5rem" />}
            className="secondary"
            fn={next}
            disabled={cannotMoveForward()}
            height="3rem"
            width="3rem"
          />
        </div>
      </div>
    </FrameTemplate>
  );
};

export default FrameFactory;
