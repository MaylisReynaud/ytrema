import React from 'react';
import {
  ConnectionContainer,
  RegisterButton,
  LoginButton
} from './style';



export function Connection(props) {
  return (
    <ConnectionContainer>
      <RegisterButton>S'enregistrer</RegisterButton>
      <LoginButton>Se connecter</LoginButton>
    </ConnectionContainer>
  );
}