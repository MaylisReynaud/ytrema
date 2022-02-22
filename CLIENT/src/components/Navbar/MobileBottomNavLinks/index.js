import React from 'react';
import { BottomNavLinksContainer, 
         LinksWrapper,
         LinkItem,
         Link,         
         ImgContainer,
         ScrollIcon,
         FlowerIcon,
         BookOpenIcon,
         ApparelIcon,
         PersonIcon
} from './style';




export function MobileBottomNavLinks(props) {
  return (
    <BottomNavLinksContainer>
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
          <LinkItem>
            <Link href="/mon-compte ">
              <ImgContainer>
                <PersonIcon />
              </ImgContainer>
              Maÿlis
            </Link>
          </LinkItem>
        </LinksWrapper>
    </BottomNavLinksContainer>
  );
}
