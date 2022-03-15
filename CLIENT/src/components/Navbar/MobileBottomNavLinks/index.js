import React, {useState} from 'react';
import { BottomNavLinksContainer, 
         LinksWrapper,
         LinkItem,
         LinkStyle, 
         ActiveLinkStyle,        
         ImgContainer,
         ScrollIcon,
         FlowerIcon,
         BookOpenIcon,
         ApparelIcon,
         PersonIcon
} from './style';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../../utils/navLinks';



export function MobileBottomNavLinks(props) {

  return (
    
    <BottomNavLinksContainer>
      <LinksWrapper>
      {navLinks.map((navLink) => (
        <LinkItem key={navLink.id}>
        <NavLink 
          to={navLink.path}
          style={(navData) => (navData.isActive) ? ActiveLinkStyle : LinkStyle}
        >
          <ImgContainer>
            <ScrollIcon />
          </ImgContainer>
          {navLink.name}
        </NavLink>
      </LinkItem>
      ))}
        </LinksWrapper>
    </BottomNavLinksContainer>
  );
}
