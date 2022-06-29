import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { defaultState } from '../../../store/state/authSlice';
import {
  ConnectionContainer,
  LogoutButton,
  buttonVariants
} from './style';
import { DeviceSize } from '../Responsive';
import { useMediaQuery } from 'react-responsive';


export function Logout({ showBurgerMenu, toggleBurgerMenu }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  const isDesktop = useMediaQuery({ minWidth: DeviceSize.desktop });



  const removePersistStore = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(defaultState('initialState'));
  }
  return (
    <>
      {isMobile && (
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
      )}

      {isDesktop && (
        <ConnectionContainer>
          <LogoutButton
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
            onClick={() => {
              removePersistStore();
              navigate('/');
            }}
          >
            Se déconnecter
          </LogoutButton>
        </ConnectionContainer>
      )}

    </>
  );
}