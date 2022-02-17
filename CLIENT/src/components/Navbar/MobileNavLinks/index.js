import React, { useState } from 'react';
import  { Connection }  from '../Connection';
import { MenuToggle } from '../MenuToggle';
import { NavLinksContainer,
         LinksWrapper,
         LinkItem,
         Link,
         Marginer
} from './style';


export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
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
          <Marginer />
          <Connection />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}