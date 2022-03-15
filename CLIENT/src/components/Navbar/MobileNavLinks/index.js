import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import  { Connection }  from '../Connection';
import { MenuToggle } from '../MenuToggle';
import { NavLinksContainer,
         LinksWrapper,
         LinkItem,
         Marginer,
         LinkStyle,
         ImgSpan
} from './style';
import  { Apparel } from '@styled-icons/zondicons';
import { BookOpen } from '@styled-icons/fa-solid';
import { Scroll } from '@styled-icons/fa-solid/Scroll';
import { Flower1 } from '@styled-icons/bootstrap';
import { Person } from '@styled-icons/open-iconic';



export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <LinkItem>
            <ImgSpan>
              <Scroll />
            </ImgSpan>
            <NavLink 
              to ="/tissus"
              style={LinkStyle}
            >
              Tissus
            </NavLink>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Flower1 />
            </ImgSpan>
            <NavLink 
              to="/mercerie"
              style={LinkStyle}
            >
              Mercerie
            </NavLink>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <BookOpen />
            </ImgSpan>
            <NavLink 
              to="/patrons"
              style={LinkStyle}
            >
              Patrons
            </NavLink>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Apparel />
            </ImgSpan>
            <NavLink 
              to="/projets "
              style={LinkStyle}
            >
              Projets
            </NavLink>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Person />
            </ImgSpan>
            <NavLink 
              to="/profile "
              style={LinkStyle}
            >
              Maÿlis
            </NavLink>
          </LinkItem>
          <Marginer />
          <Connection />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}