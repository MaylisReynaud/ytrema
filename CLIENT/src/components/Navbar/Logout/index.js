import React from 'react';
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
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });



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
              console.log('coucou dans onClick debut');
              removePersistStore();
              console.log('coucou dans onClick milieu');
              navigate('/');
              console.log('coucou dans onClick fin');
            }}
          >
            Se déconnecter
          </LogoutButton>
        </ConnectionContainer>
      )}

    </>
  );
}