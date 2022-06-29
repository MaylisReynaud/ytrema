import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MobileConnection } from '../MobileConnection';
import { MenuToggle } from '../MenuToggle';
import {
  NavLinksContainer,
  LinksWrapper,
  LinkItem,
  Marginer,
  LinkStyle,
  ImgSpan
} from './style';
import { Apparel } from '@styled-icons/zondicons';
import { BookOpen } from '@styled-icons/fa-solid';
import { Scroll } from '@styled-icons/fa-solid/Scroll';
import { Flower1 } from '@styled-icons/bootstrap';
import { Person } from '@styled-icons/open-iconic';
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
// {isOpen && isLogged ? (
//   <LinksWrapper>
//     <Logout />
//   </LinksWrapper>
// ):(
//   <LinksWrapper>
//     <MobileConnection />
//   </LinksWrapper>
// )
// }