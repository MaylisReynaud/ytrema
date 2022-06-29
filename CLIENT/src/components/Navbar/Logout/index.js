import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { defaultState } from '../../../store/state/authSlice';
import {
  ConnectionContainer,
  LogoutButton,
  buttonVariants
} from './style';



export function Logout({showBurgerMenu, toggleBurgerMenu}) {
  let navigate = useNavigate();
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
          removePersistStore();
          toggleBurgerMenu();
          navigate('/');
        }}
      >
        Se déconnecter
      </LogoutButton>
    </ConnectionContainer>
  );
}