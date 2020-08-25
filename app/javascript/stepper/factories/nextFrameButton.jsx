import React, { useContext } from "react";
import styled from "styled-components";

import Button from "components/button";
import { StepperContext } from "contexts/StepperContext";

const NextFrameBtn = styled(Button)``;

const getBtnText = (type) => {
  const texts = {
    message: "Next",
    singleQA: "Submit",
    results: "Complete",
  };
  return texts[type];
};

const NextFrameButton = ({ exitStepper }) => {
  const { currentInputValue, next, addData, currentFrame } = useContext(
    StepperContext
  );

  const { type } = currentFrame;
  const completeStep = (e) => {
    e.preventDefault();
    addData();
    next();
  };
  const completeForm = (e) => {
    exitStepper();
  };
  const completeBtnFn = (type) => {
    const functions = {
      message: next,
      singleQA: completeStep,
      results: completeForm,
    };
    return functions[type];
  };
  const disableBtnCondition = (type) => {
    const hasInputText = currentInputValue === "";
    const conditions = {
      message: false,
      singleQA: hasInputText,
      results: false,
    };
    return conditions[type];
  };
  return (
    <NextFrameBtn
      content={getBtnText(type)}
      height="3rem"
      width="10rem"
      className="primary"
      fn={completeBtnFn(type)}
      disabled={disableBtnCondition(type)}
    />
  );
};

export default NextFrameButton;
