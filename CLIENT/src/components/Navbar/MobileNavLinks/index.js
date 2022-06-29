import React, { useState } from 'react';
import { MobileConnection } from '../MobileConnection';
import { MenuToggle } from '../MenuToggle';
import {
  NavLinksContainer,
  LinksWrapper,
} from './style';

import { useSelector } from "react-redux";
import { Logout } from '../Logout';



export function MobileNavLinks(props) {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const toggleBurgerMenu = () => setShowBurgerMenu(!showBurgerMenu);
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const isLogged = auth.isLogged;
  const activeSession = sessionStorage.getItem("token");
  return (
    <NavLinksContainer>
      {isLogged === true && activeSession && (
        <>
      <MenuToggle showBurgerMenu={showBurgerMenu} toggle={toggleBurgerMenu} />
      {showBurgerMenu && (
        <LinksWrapper>

        <Logout
          toggleBurgerMenu={toggleBurgerMenu}
          showBurgerMenu={showBurgerMenu}
        />
      </LinksWrapper>
      )}
        
        </>
      )}
      {showBurgerMenu && isLogged === false && (
        <LinksWrapper>

          <MobileConnection 
            toggleBurgerMenu={toggleBurgerMenu}
            showBurgerMenu={showBurgerMenu}
          />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
