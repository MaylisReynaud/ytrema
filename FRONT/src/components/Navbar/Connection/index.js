import React from 'react';
import {
  ConnectionContainer,
  RegisterButton,
  LoginButton
} from './style';



export function Connection(props) {
  return (
    <ConnectionContainer>
      <RegisterButton>Register</RegisterButton>
      <LoginButton>Login</LoginButton>
    </ConnectionContainer>
  );
}