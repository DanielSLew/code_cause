import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { ModalContext } from '../contexts/modalContext';
import { VALID_PASSWORD_LENGTH, VALID_USERNAME_LENGTH } from '../helpers';
import Input from './Input';
import Button from './button';
import UserForm from './userForm';

function Login() {
  const { user, setUser } = useContext(UserContext);
  const { modal, toggleModal } = useContext(ModalContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('/api/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: username,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.error) { 
          // handle error message
      } else {
        localStorage.setItem('token', data.jwt);
        setUser(data.user);
        toggleModal();
      }
    });
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const disableLogin = () => {
    return !(password.length >= VALID_PASSWORD_LENGTH && 
             username.length >= VALID_USERNAME_LENGTH) || isLoading;
  }

  if (user.id) {
    return <Redirect to='/projects' />
  } else {
  return (
      <> 
        <UserForm title='Login'>
          <Input 
            id='username'
            name='username'
            placeholder="Enter username..."
            label="Username"
            type="text"
            fn={handleUsernameChange}
          />
          <Input 
            id='password'
            name='password'
            placeholder="Enter password..."
            label='Password'
            type="password"
            fn={handlePasswordChange}
          />
          <Button
            value="submit"
            content="Login"
            disabled={disableLogin()}
            fn={handleSubmit}
          />
        </UserForm>
      </>
    );
  }
}

export default Login;