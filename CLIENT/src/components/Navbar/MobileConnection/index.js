import React  from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ConnectionContainer,
  RegisterButton,
  LoginButton,
  buttonVariants
} from './style';



export function MobileConnection(isOpen, setOpen) {
  let navigate = useNavigate();
  const toggle = (() => setOpen(!isOpen));
  return (

    
      <ConnectionContainer>
      <RegisterButton 
        variants={buttonVariants}
        whileHover='hover'
        whileTap='tap'
        onClick={() => {
          toggle();
          navigate('/');
        }}
      >
        S'inscrire
      </RegisterButton>
      <LoginButton
        variants={buttonVariants}
        whileHover='hover'
        whileTap='tap'
        onClick={() => {
          toggle();
          navigate('/');
        }}
      >
        Se connecter
      </LoginButton>
    </ConnectionContainer>
  
  );
}