import React, { useState, useContext } from "react";

import { UserContext } from "contexts/userContext";
import {
  VALID_PASSWORD_LENGTH,
  VALID_USERNAME_LENGTH,
} from "helpers/validations";
import { loginUser } from "actions/user";

import Modal from "components/modal";
import Input from "components/input";
import Button from "components/button";

import UserForm from "layouts/userForm";

function Login({ toggleModal }) {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = { password, name: username };

    loginUser({ params, setUser, setIsLoading, toggleModal });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const validPassword = () => {
    return password.length >= VALID_PASSWORD_LENGTH;
  };

  const validUsername = () => {
    return username.length >= VALID_USERNAME_LENGTH;
  };

  const disableLogin = () => {
    debugger;
    return !(validUsername() && validPassword()) || isLoading;
  };

  return (
    <Modal toggleModal={toggleModal}>
      <UserForm title="Login">
        <Input
          id="username"
          name="username"
          placeholder="Enter username..."
          label="Username"
          type="text"
          valid={validUsername()}
          fn={handleUsernameChange}
        />
        <Input
          id="password"
          name="password"
          placeholder="Enter password..."
          label="Password"
          type="password"
          valid={validPassword()}
          fn={handlePasswordChange}
        />
        <Button
          value="submit"
          content="Login"
          disabled={disableLogin()}
          fn={handleSubmit}
        />
      </UserForm>
    </Modal>
  );
}

export default Login;
