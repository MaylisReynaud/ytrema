import React from 'react';
import { NavLinksContainer, 
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

export function NavLinks(props) {
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const isLogged = auth.isLogged;
  const activeSession = sessionStorage.getItem("token");
  return (
    <NavLinksContainer>
      {isLogged === true && activeSession && (
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
      )}
    </NavLinksContainer>
  );
}
