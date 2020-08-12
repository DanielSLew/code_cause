import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { UserContext } from '../contexts/userContext';
import { ModalContext } from '../contexts/modalContext';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

import Button from './button';

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
        <button onClick={handleLogout}>Logout</button>
        <h1 style={{color: 'white'}}>Welcome {user.name}</h1>
      </NavContainer>
    )
  } else {
    return (
      <NavContainer>
        <Button 
          fn={() => handleFormModal('LoginPage')}
          content='Login'
        >Login</Button>
        <Button 
          fn={() => handleFormModal('SignUpPage')}
          content='Sign Up'
        >Sign Up</Button>
      </NavContainer>
    )
  }
};

export default Header;
