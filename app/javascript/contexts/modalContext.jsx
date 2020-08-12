import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({content: ''});

  const toggleModal = () => setModal(!modal);

  return (
    <ModalContext.Provider value={{ modal, toggleModal, modalContent, setModalContent }}>
      {children}
    </ModalContext.Provider>
  );
}