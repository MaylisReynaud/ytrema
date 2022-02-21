import React from 'react';
import { NavLinksContainer, 
         LinksWrapper,
         LinkItem,
         Link,         
         ImgContainer,
         ScrollIcon,
         FlowerIcon,
         BookOpenIcon,
         ApparelIcon
} from './style';




export function NavLinks(props) {
  return (
    <NavLinksContainer>
      <LinksWrapper>
          <LinkItem>
            <Link href="/tissus">
              <ImgContainer>
                <ScrollIcon />
              </ImgContainer>
              Tissus
            </Link>
          </LinkItem>
          <LinkItem>
            <Link href="/mercerie">
              <ImgContainer>
                <FlowerIcon />
              </ImgContainer>
              Mercerie
            </Link>
          </LinkItem>
          <LinkItem>
            <Link href="/patrons">
              <ImgContainer>
                <BookOpenIcon />
              </ImgContainer>
              Patrons
            </Link>
          </LinkItem>
          <LinkItem>
            <Link href="/projets ">
              <ImgContainer>
                <ApparelIcon />
              </ImgContainer>
              Projets
            </Link>
          </LinkItem>
        </LinksWrapper>
    </NavLinksContainer>
  );
}
