import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinksContainer, 
         LinksWrapper,
         LinkItem,
         LinkStyle,
         ImgContainer,
         ScrollIcon,
         FlowerIcon,
         BookOpenIcon,
         ApparelIcon,
} from './style';






export function NavLinks(props) {
  return (
    <NavLinksContainer>
      <LinksWrapper>
          <LinkItem>
            <Link 
              to="/tissus"
              style={LinkStyle}
            >
              <ImgContainer>
                <ScrollIcon />
              </ImgContainer>
              Tissus
            </Link>
          </LinkItem>
          <LinkItem>
            <Link 
                to="/mercerie"
                style={LinkStyle}
              >
                <ImgContainer>
                  <FlowerIcon />
                </ImgContainer>
                Mercerie
            </Link>
          </LinkItem>
          <LinkItem>
            <Link
              to="/patrons"
              style={LinkStyle}
            >
              <ImgContainer>
                <BookOpenIcon />
              </ImgContainer>
              Patrons
            </Link>
          </LinkItem>
          <LinkItem>
            <Link 
                to="/projets"
                style={LinkStyle}
              >
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
