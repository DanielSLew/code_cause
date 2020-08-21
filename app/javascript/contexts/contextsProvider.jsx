import React from "react";

import { UserProvider } from "contexts/userContext";
import { StepperProvider } from "contexts/StepperContext";

const ContextsProviders = ({ children }) => (
  <UserProvider>
    <StepperProvider>{children} </StepperProvider>
  </UserProvider>
);

export default ContextsProviders;
