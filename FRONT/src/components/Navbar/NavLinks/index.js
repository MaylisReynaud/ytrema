import React from 'react';
import { NavLinksContainer, 
         LinksWrapper,
         LinkItem,
         Link
 } from './style';  


export function NavLinks(props) {
  return (
    <NavLinksContainer>
      <LinksWrapper>
          <LinkItem>
            <Link href="/tissus">Tissus</Link>
          </LinkItem>
          <LinkItem>
            <Link href="/mercerie">Mercerie</Link>
          </LinkItem>
          <LinkItem>
            <Link href="/patrons">Patrons</Link>
          </LinkItem>
          <LinkItem>
            <Link href="/projets ">Projets</Link>
          </LinkItem>
        </LinksWrapper>
    </NavLinksContainer>
  );
}
