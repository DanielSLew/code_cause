import React, { useContext } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "react-feather";

import { StepperContext } from "contexts/StepperContext";
import StepperMap from "stepper/stepperMap";
import Button from "components/button";
import { getColor } from "helpers/palette";

const StyledStepperController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 1;
  grid-row: 1;
  padding: 4rem 0;
  background-color: ${getColor("dark")};
  color: ${getColor("secondary")};
  .nav-button-section {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .step-indicator {
    font-size: 1.3rem;
    margin-top: 2rem;
  }
  .map-box {
    flex: 1;
    margin: 2rem 0;
    width: 60%;
  }
  .submit-section {
    width: 60%;
    margin: 0 auto;
  }

  .tabButton {
    transition: 0.2s;
    display: inline-block;
  }
  .tabButton:hover {
    background-color: #182533;
    color: ${getColor("lightBorder")};
    box-shadow: none;
  }
`;

const StepperController = ({ next, prev, exit, tag }) => {
  const {
    stepperData,
    addData,
    steps,
    step,
    cannotMoveForward,
    cannotMoveBackward,
  } = useContext(StepperContext);

  const completeStep = (e) => {
    e.preventDefault();
    addData(tag, stepperData[tag]);
    next();
  };

  return (
    <StyledStepperController>
      <div className="nav-button-section">
        <Button
          content={<ChevronLeft size="2rem" />}
          fn={prev}
          disabled={cannotMoveBackward()}
          className="stepper-tab-button"
          height="3rem"
          width={`30%`}
        />
        <Button
          content={<ChevronRight size="2rem" />}
          fn={next}
          disabled={cannotMoveForward()}
          className="stepper-tab-button"
          height="3rem"
          width={`30%`}
        />
      </div>
      <div className="step-indicator">
        <p>Step:</p>
        <p>
          {step + 1} of {steps.length}
        </p>
      </div>
      <div className="map-box">
        <StepperMap />
      </div>
      <div className="submit-section">
        <Button
          height="3rem"
          content="Submit Form"
          fontSize={"1.2rem"}
          fn={completeStep}
          disabled={true}
          className="stepper-tab-button"
          width={`100%`}
        />
        <Button
          height="3rem"
          content="Exit"
          fontSize={"1.2rem"}
          fn={exit}
          className="stepper-tab-button"
          width={`100%`}
        />
      </div>
    </StyledStepperController>
  );
};

export default StepperController;
