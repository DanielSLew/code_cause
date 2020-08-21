import React, { useContext } from "react";
import styled from "styled-components";
import { Circle, CheckCircle } from "react-feather";

import { StepperContext } from "contexts/StepperContext";
import { getColor } from "helpers/palette";

const StyledStepperMap = styled.div`
  background-color: ${getColor("dark")};
  .map-circle {
    margin: 0.75rem;
  }
`;

const StepperNav = () => {
  const { steps } = useContext(StepperContext);
  return (
    <StyledStepperMap>
      <div className="map">
        {steps.map((step, index) => {
          return step.completed ? (
            <CheckCircle
              key={step.tag}
              color="green"
              className="map-circle"
              size="2rem"
            />
          ) : (
            <Circle
              key={step.tag}
              color={getColor("secondary")}
              className="map-circle"
              size="2rem"
            />
          );
        })}
      </div>
    </StyledStepperMap>
  );
};

export default StepperNav;
