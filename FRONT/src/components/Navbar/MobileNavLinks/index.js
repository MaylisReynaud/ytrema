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
          <Marginer />
          <Connection />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}