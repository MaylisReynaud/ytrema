import React from 'react';
import { NavLinksContainer, 
         LinksWrapper,
         LinkItem,
         Link
 } from './style';  
 import tissuImg from '../../../assets/images/tissu-noir.png';
 import tissuImgColor from '../../../assets/images/tissu-jaune.png';
 import boutonImg from '../../../assets/images/bouton-noir.png';
 import boutonImgColor from '../../../assets/images/bouton-vert.png';
 import patronImg from '../../../assets/images/patron-noir.png';
 import patronImgColor from '../../../assets/images/patron-vert.png';
 import projetImg from '../../../assets/images/mac-noir.png';
 import projetImgColor from '../../../assets/images/mac-orange.png';
 






export function NavLinks(props) {
  return (
    <NavLinksContainer>
      <LinksWrapper>
          <LinkItem>
            <Link href="/tissus">
            <img src={tissuImg}></img>
              Tissus
            </Link>
          </LinkItem>
          <LinkItem>
            <Link href="/mercerie">
            <img src={boutonImg}></img>
              Mercerie
            </Link>
          </LinkItem>
          <LinkItem>
            <Link href="/patrons">
            <img src={patronImg}></img>
              Patrons
            </Link>
          </LinkItem>
          <LinkItem>
            <Link href="/projets ">
            <img src={projetImg}></img>
              Projets
            </Link>
          </LinkItem>
        </LinksWrapper>
    </NavLinksContainer>
  );
}
