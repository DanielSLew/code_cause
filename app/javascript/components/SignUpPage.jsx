import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { ModalContext } from '../contexts/modalContext';
import { VALID_PASSWORD_LENGTH, 
         VALID_USERNAME_LENGTH,
         VALID_EMAIL_REGEX } from '../helpers';
import Input from './Input';
import Button from './button';
import TextBox from './textbox';
import UserForm from './userForm';

function SignUpPage() {
  const { user, setUser } = useContext(UserContext);
  const { modal, toggleModal } = useContext(ModalContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('/api/v1/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {...formFields} )
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.error) {
          setIsLoading(false);
          // handle error message
      } else {
        localStorage.setItem('token', data.jwt);
        setUser(data.user);
        toggleModal();
      }
    });
  }

  const handleFormFieldChange = (e) => {
    setFormFields( {...formFields, [e.target.id]: e.target.value });
  }

  const disableSignup = () => {
    return !(validPassword() && validUsername() &&
             validEmail() && passwordsMatch()) || 
             isLoading;
  }

  const validPassword = () => {
    return formFields.password.length >= VALID_PASSWORD_LENGTH;
  }

  const validUsername = () => {
    return formFields.name.length >= VALID_USERNAME_LENGTH ; 
  }

  const validEmail = () => {
    return formFields.email.match(VALID_EMAIL_REGEX);
  }

  const passwordsMatch = () => {
    return formFields.passwordConfirm === formFields.password;
  }

  if (user.id) {
    return <Redirect to='/projects' />
  } else {
  return (
      <> 
        <UserForm title="Sign Up">
          <Input 
            id='name'
            name='name'
            placeholder="Enter username..."
            label="Username"
            type="text"
            valid={validUsername()}
            fn={handleFormFieldChange}
          />
          <Input 
            id='email'
            name='email'
            placeholder="example@example.com..."
            label='Email'
            type="email"
            valid={validEmail()}
            fn={handleFormFieldChange}
          />
          <TextBox 
            id='bio'
            name='bio'
            placeholder="Enter bio..."
            label="Write a bit about yourself"
            fn={handleFormFieldChange}
          />
          <Input 
            id='organization'
            name='organization'
            placeholder="Enter your organization..."
            label='Organization'
            type="text"
            valid={true}
            fn={handleFormFieldChange}
          />
          <Input 
            id='password'
            name='password'
            placeholder="Enter password..."
            label='Password'
            type="password"
            valid={validPassword()}
            fn={handleFormFieldChange}
          />
          <Input 
            id='passwordConfirm'
            name='passwordConfirm'
            placeholder="Confirm your password..."
            label='Confirm password'
            type="password"
            valid={passwordsMatch()}
            fn={handleFormFieldChange}
          />
          <Button
            value="submit"
            content="Sign Up"
            disabled={disableSignup()}
            fn={handleSubmit}
          />
        </UserForm>
      </>
    );
  }
}

export default SignUpPage;