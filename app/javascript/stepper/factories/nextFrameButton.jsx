import React, { useContext } from "react";
import { UserContext } from "contexts/userContext";
import styled from "styled-components";

import Button from "components/button";
import { StepperContext } from "contexts/StepperContext";
import { createProject } from "actions/project";

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
  const {
    currentInputValue,
    next,
    addData,
    currentFrame,
    stepperData,
  } = useContext(StepperContext);
  const { user } = useContext(UserContext);

  const { type } = currentFrame;
  const completeStep = (e) => {
    e.preventDefault();
    addData();
    next();
  };
  const completeForm = (e) => {
    // TODO: setting the created project as the current project state
    // so that when a project is created we can navigate to the new project
    const setProjectState = () => {};
    const params = {
      name: stepperData[5].answer,
      description: stepperData[0].answer,
      creator: {
        username: user.name,
        id: user.id,
      },
      body: stepperData.map(({ question, answer }) => ({ question, answer })),
    };

    createProject({ setState: setProjectState, method: "POST", params });

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
