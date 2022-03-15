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




export function MobileBottomNavLinks(props) {
  return (
    
    <BottomNavLinksContainer>
      <LinksWrapper>
          <LinkItem>
            <NavLink 
              to="/tissus"
              style={(navData) => (navData.isActive) ? ActiveLinkStyle : LinkStyle}
            >
              <ImgContainer>
                <ScrollIcon />
              </ImgContainer>
              
              Tissus
            </NavLink>
          </LinkItem>
          <LinkItem>
          <NavLink 
              to="/mercerie"
              style={(navData) => (navData.isActive) ? ActiveLinkStyle : LinkStyle}
            >
              
              <ImgContainer>
                <FlowerIcon />
              </ImgContainer>
              Mercerie
            </NavLink>
          </LinkItem>
          <LinkItem>
          <NavLink 
              to="/patrons"
              style={(navData) => (navData.isActive) ? ActiveLinkStyle : LinkStyle}
            >
              <ImgContainer>
                <BookOpenIcon />
              </ImgContainer>
              Patrons
            </NavLink>
          </LinkItem>
          <LinkItem>
          <NavLink 
              to="/projets"
              style={(navData) => (navData.isActive) ? ActiveLinkStyle : LinkStyle}
            >
              <ImgContainer>
                <ApparelIcon />
              </ImgContainer>
              Projets
            </NavLink>
          </LinkItem>
          <LinkItem>
            <NavLink
              to="/profile"
              style={(navData) => (navData.isActive) ? ActiveLinkStyle : LinkStyle}
            >
              <ImgContainer>
                <PersonIcon />
              </ImgContainer>
              Maÿlis
            </NavLink>
          </LinkItem>
        </LinksWrapper>
    </BottomNavLinksContainer>
  );
}
