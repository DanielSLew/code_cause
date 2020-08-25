import React, { useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "contexts/StepperContext";
import InputFactory from "stepper/factories/inputFactory";

import { Title, SubTitle, Question, Details } from "stepper/frames/elements";

const StyledQA = styled.form`
  position: relative;
`;

const SingleQA = () => {
  const { currentFrame, typeAnswer, currentInputValue } = useContext(
    StepperContext
  );

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
      <Question htmlFor={tag} className="QA-label">
        {question}
      </Question>
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
    </StyledQA>
  );
};

export default SingleQA;
