import React, {useState} from 'react';
import { BottomNavLinksContainer, 
         LinksWrapper,
         LinkItem,
         LinkStyle, 
         ActiveLinkStyle,        
         IconContainer,
         IconStyle 
} from './style';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../../utils/navLinks';
import { iconsNavLinks } from '../../../utils/iconsNavLinks';
import { useSelector } from "react-redux";


export function MobileBottomNavLinks(props) {
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const isLogged = auth.isLogged;
  const activeSession = sessionStorage.getItem("token");
  return (
    <>
    {isLogged === true && activeSession && (
      <BottomNavLinksContainer>
      <LinksWrapper>
      {navLinks.map((navLink, index) => {
        const Icon = iconsNavLinks[index];

        return (
          <LinkItem key={navLink.id}>
          <NavLink 
            to={navLink.path}
            style={(navData) => (navData.isActive) ? ActiveLinkStyle : LinkStyle}
          >
            <IconContainer>
              <Icon 
              style= {IconStyle}
              />
            </IconContainer>
            {navLink.name}
          </NavLink>
        </LinkItem>
        )

      })}

        </LinksWrapper>
    </BottomNavLinksContainer>
    )}
    </>
  );
}
