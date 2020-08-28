import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "contexts/userContext";
import Button from "components/button";
import { getColor } from "helpers/palette";
import { logoutUser } from "actions/user";

const NavContainer = styled.nav`
  height: 4rem;
  max-width: 100vw;
  position: sticky;
  top: 0;
  background-color: ${getColor("dark")};
  z-index: 10;
`;

const Header = ({ toggleLogin, toggleSignUp, toggleDrawer, toggleStepper }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <NavContainer>
      <Button fn={toggleDrawer} content="Menu" />
      <Button fn={toggleStepper} content="Stepper" />
      {user.id ? (
        <>
          <Button content="Logout" fn={() => logoutUser({ setUser })} />
          <h1 style={{ color: "white" }}>Welcome {user.name}</h1>
        </>
      ) : (
        <>
          <Button fn={toggleLogin} content="Login" />
          <Button fn={toggleSignUp} content="Sign Up" />
        </>
      )}
    </NavContainer>
  );
};

export default Header;
