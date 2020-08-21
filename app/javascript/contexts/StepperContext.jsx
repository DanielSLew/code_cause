import React, { useState, createContext } from "react";

import { instructions } from "helpers/instructions";
import { mapTagsToObject } from "helpers/instructions";

export const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [steps, setSteps] = useState(
    instructions.map((step) => {
      return { ...step, completed: false };
    })
  );

  const [temporaryVals, setTemporaryValues] = useState(
    mapTagsToObject(instructions)
  );

  const [frame, setFrame] = useState(0);
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const currentFrame = steps[step].frame[frame];

  const saveInput = (tag, val) =>
    setTemporaryValues({ ...temporaryVals, [tag]: val });

  const addData = (tag, val) => {
    setSteps((currentSteps) =>
      currentSteps.map((step) => {
        return step.tag === tag
          ? { ...step, completed: true, answer: val }
          : step;
      })
    );
  };
  const nextFrame = () => setFrame((currentFrame) => currentFrame + 1);
  const nextStep = () => {
    setStep((currentStep) => currentStep + 1);
  };
  const cannotMoveForward = () =>
    frame >= steps[step].frame.length - 1 && step >= steps.length - 1;

  const cannotMoveBackward = () => frame <= 0 && step <= 0;

  const next = () => {
    if (cannotMoveForward()) return;
    if (frame + 1 < currentStep.frame.length) {
      nextFrame();
    } else {
      nextStep();
      setFrame(0);
    }
  };
  const prev = () => {
    if (cannotMoveBackward()) return;
    if (frame === 0) {
      setStep((thisStep) => thisStep - 1);
      const prevStep = steps[step - 1];
      setFrame(prevStep.frame.length - 1);
    } else {
      setFrame((thisFrame) => thisFrame - 1);
    }
  };
  return (
    <StepperContext.Provider
      value={{
        steps,
        setSteps,
        temporaryVals,
        saveInput,
        addData,
        frame,
        setFrame,
        step,
        setStep,
        currentStep,
        currentFrame,
        prev,
        next,
        cannotMoveBackward,
        cannotMoveForward,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
