import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { defaultState } from '../../../store/state/authSlice';
import {
  ConnectionContainer,
  LogoutButton,
  buttonVariants
} from './style';



export function Logout(isOpen, setOpen) {
  let navigate = useNavigate();
  const toggle = (() => setOpen(!isOpen));
  const dispatch = useDispatch();
  const removePersistStore = () => {
      sessionStorage.clear();
      localStorage.clear();
      dispatch(defaultState('initialState'));
    }
  return (
    <ConnectionContainer>
      <LogoutButton
        variants={buttonVariants}
        whileHover='hover'
        whileTap='tap'
        onClick={() => {
          toggle();
          removePersistStore();
          navigate('/');
        }}
      >
        Se déconnecter
      </LogoutButton>
    </ConnectionContainer>
  );
}