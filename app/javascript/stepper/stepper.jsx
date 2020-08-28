import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "contexts/userContext";
import { StepperContext } from "contexts/StepperContext";
import FrameFactory from "stepper/factories/frameFactory";
import StepperMap from "stepper/stepperMap";
import Background from "stepper/background";
import { getColor } from "helpers/palette";
import { User } from "react-feather";

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
    overflow-y: auto;
  }
`;

const Stepper = ({ toggleStepper }) => {
  const { currentFrame } = useContext(StepperContext);
  const { user } = useContext(UserContext);
  const [isOpening, setIsOpening] = useState(true);
  console.log(user);
  const exitStepper = (e) => {
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
          {user.id ? (
            <FrameFactory
              frameType={currentFrame.type}
              exitStepper={exitStepper}
            />
          ) : (
            <h2>Must be signed in</h2>
          )}
        </div>
        <StepperMap />
      </StepperWindow>
    </Background>
  );
};

export default Stepper;
