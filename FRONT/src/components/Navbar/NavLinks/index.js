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
          <Link href="#">About us</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">How it works</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">Explore</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">Impact</Link>
        </LinkItem>
      </LinksWrapper>
    </NavLinksContainer>
  );
}
