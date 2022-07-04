import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ConnectionContainer,
  RegisterButton,
  LoginButton,
  buttonVariants
} from './style';



export function DesktopConnection(props) {
  let navigate = useNavigate();

  return (


    <ConnectionContainer>
      <RegisterButton
        variants={buttonVariants}
        whileHover='hover'
        whileTap='tap'
        onClick={() => {
          navigate('/inscription');
        }}
      >
        S'inscrire
      </RegisterButton>
      <LoginButton
        variants={buttonVariants}
        whileHover='hover'
        whileTap='tap'
        onClick={() => {
          navigate('/connexion');
        }}
      >
        Se connecter
      </LoginButton>
    </ConnectionContainer>


  );
}