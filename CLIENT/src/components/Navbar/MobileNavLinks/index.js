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
  const [isOpen, setOpen] = useState(false);
  const toggleBurgerMenu = () => setOpen(!isOpen);
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const isLogged = auth.isLogged;
  const activeSession = sessionStorage.getItem("token");
  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={toggleBurgerMenu} />
      {isOpen && isLogged === true && (
        <LinksWrapper>

          <Logout
            toggleBurgerMenu={toggleBurgerMenu}
            isOpen={isOpen}
          />
        </LinksWrapper>
      )}
      {isOpen && isLogged === false && (
        <LinksWrapper>

          <MobileConnection 
            toggleBurgerMenu={toggleBurgerMenu}
            isOpen={isOpen}
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