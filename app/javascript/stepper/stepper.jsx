import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { StepperContext } from "contexts/StepperContext";
import FrameFactory from "stepper/factories/frameFactory";
import StepperNav from "stepper/stepperNav";
import Background from "stepper/background";
import { getColor } from "helpers/palette";

const StepperWindow = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:
    minmax(300px, 400px)
    minmax(auto, 100px)
    minmax(700px, 800px)
    auto;
  .stepper-panel {
    grid-column: 3/4;
    display: flex;
    flex-direction: column;
  }
`;

const Stepper = ({ toggleStepper }) => {
  const { steps, setSteps, step, currentFrame, next, prev } = useContext(
    StepperContext
  );

  const [isOpening, setIsOpening] = useState(true);

  const handleClick = (e) => {
    setIsOpening(false);
    setTimeout(() => toggleStepper(), 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsOpening(false);
      setTimeout(() => toggleStepper(), 200);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <Background
      duration={"0.3s"}
      bgColor={getColor("lightgrey")}
      fadeIn={isOpening}
    >
      <StepperWindow>
        <div className="stepper-panel">
          <FrameFactory frame={currentFrame} />
        </div>
        <StepperNav
          help={currentFrame.help}
          next={next}
          prev={prev}
          setSteps={setSteps}
          steps={steps}
          step={step}
          tag={currentFrame.tag}
          exit={handleClick}
        />
      </StepperWindow>
    </Background>
  );
};

export default Stepper;
