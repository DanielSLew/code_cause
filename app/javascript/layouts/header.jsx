import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

import { UserContext } from 'contexts/userContext';
import { ModalContext } from 'contexts/modalContext';

import Login from 'components/Login';
import SignUp from 'components/SignUp';

import Button from 'components/button';

const NavContainer = styled.nav`
  height: 6rem;
  background-color: black;
`;

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { toggleModal, setModalContent } = useContext(ModalContext);

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('token');
  }

  const handleFormModal = (page) => {
    const formType = page === 'LoginPage' ? LoginPage : SignUpPage;
    setModalContent({ content: formType })
    toggleModal();
  }

  if (user.id) {
    return (
      <NavContainer>
        <Button content='Logout' fn={handleLogout} />
        <h1 style={{color: 'white'}}>Welcome {user.name}</h1>
      </NavContainer>
    )
  } else {
    return (
      <NavContainer>
        <Button 
          fn={() => handleFormModal('LoginPage')}
          content='Login'
        />
        <Button 
          fn={() => handleFormModal('SignUpPage')}
          content='Sign Up'
        />
      </NavContainer>
    )
  }
};

export default Header;
