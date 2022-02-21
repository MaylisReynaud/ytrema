import React from 'react';
import { NavLinksContainer, 
         LinksWrapper,
         LinkItem,
         Links,
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
            <Links to="/tissus">
              <ImgContainer>
                <ScrollIcon />
              </ImgContainer>
              Tissus
            </Links>
          </LinkItem>
          <LinkItem>
            <Links to="/mercerie">
              <ImgContainer>
                <FlowerIcon />
              </ImgContainer>
              Mercerie
            </Links>
          </LinkItem>
          <LinkItem>
            <Links to="/patrons">
              <ImgContainer>
                <BookOpenIcon />
              </ImgContainer>
              Patrons
            </Links>
          </LinkItem>
          <LinkItem>
            <Links to="/projets ">
              <ImgContainer>
                <ApparelIcon />
              </ImgContainer>
              Projets
            </Links>
          </LinkItem>
        </LinksWrapper>
    </NavLinksContainer>
  );
}
