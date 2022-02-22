import React, { useState } from 'react';
import  { Connection }  from '../Connection';
import { MenuToggle } from '../MenuToggle';
import { NavLinksContainer,
         LinksWrapper,
         LinkItem,
         Link,
         Marginer,
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
            <Link href="/tissus">Tissus</Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Flower1 />
            </ImgSpan>
            <Link href="/mercerie">Mercerie</Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <BookOpen />
            </ImgSpan>
            <Link href="/patrons">Patrons</Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Apparel />
            </ImgSpan>
            <Link href="/projets ">Projets</Link>
          </LinkItem>
          <LinkItem>
            <ImgSpan>
              <Person />
            </ImgSpan>
            <Link href="/mon-compte ">Maÿlis</Link>
          </LinkItem>
          <Marginer />
          <Connection />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}