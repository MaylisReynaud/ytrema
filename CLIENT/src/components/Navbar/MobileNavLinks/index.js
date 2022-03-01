import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <Link 
              to ="/tissus"
              style={LinkStyle}
            >
              Tissus
            </Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Flower1 />
            </ImgSpan>
            <Link 
              to="/mercerie"
              style={LinkStyle}
            >
              Mercerie
            </Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <BookOpen />
            </ImgSpan>
            <Link 
              to="/patrons"
              style={LinkStyle}
            >
              Patrons
            </Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Apparel />
            </ImgSpan>
            <Link 
              to="/projets "
              style={LinkStyle}
            >
              Projets
            </Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Person />
            </ImgSpan>
            <Link 
              to="/mon-compte "
              style={LinkStyle}
            >
              Maÿlis
            </Link>
          </LinkItem>
          <Marginer />
          <Connection />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}