import React from 'react';

import { UserProvider } from 'contexts/userContext';
import { ModalProvider } from 'contexts/modalContext';

const ContextsProviders = ({ children }) => (
  <ModalProvider>
    <UserProvider>
      {children}
    </UserProvider>
  </ModalProvider>
)

export default ContextsProviders;