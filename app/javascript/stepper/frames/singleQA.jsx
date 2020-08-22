import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "contexts/StepperContext";
import InputFactory from "stepper/factories/inputFactory";
import Button from "components/button";
import Help from "stepper/help";
import { Title, SubTitle, Label, Details } from "stepper/frames/elements";

const StyledQA = styled.form`
  position: relative;
  height: 100%;
  .QA-input {
    margin-left: 2rem;
  }
  .submit-button {
    position: absolute;
    bottom: 4rem;
    right: 0;
  }
  .QA-help {
    position: absolute;
    bottom: 4rem;
    left: 0;
  }
`;

const SingleQA = () => {
  const {
    addData,
    next,
    currentFrame,
    typeAnswer,
    currentInputValue,
  } = useContext(StepperContext);

  const { subTitle, question, details, input, tag, title, help } = currentFrame;
  const handleTyping = (e) => {
    typeAnswer(e.target.value);
  };
  const completeStep = (e) => {
    e.preventDefault();
    addData();
    next();
  };

  return (
    <StyledQA onSubmit={completeStep}>
      <Title>{title}</Title>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <Label htmlFor={tag} className="QA-label">
        {question}
      </Label>
      {details && <Details details={details}>{details}</Details>}

      <InputFactory
        inputData={{
          ...input,
          fn: handleTyping,
          id: tag,
          tag: tag,
          className: "QA-input",
          placeholder: "Type here",
          value: currentInputValue,
        }}
      />
      <Help helpText={help} className="QA-help" />
      <Button
        content="Submit"
        height="3rem"
        width="10rem"
        className="submit-button primary"
        fn={completeStep}
        disabled={currentInputValue === ""}
      />
    </StyledQA>
  );
};

export default SingleQA;
