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



export function MobileBottomNavLinks(props) {

  return (
    
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
  );
}
