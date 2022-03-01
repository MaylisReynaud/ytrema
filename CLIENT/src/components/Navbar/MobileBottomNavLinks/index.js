import React, {useState} from 'react';
import { BottomNavLinksContainer, 
         LinksWrapper,
         LinkItem,
         LinkStyle, 
         ActiveLinkStyle,        
         ImgContainer,
         ScrollIcon,
         FlowerIcon,
         BookOpenIcon,
         ApparelIcon,
         PersonIcon
} from './style';
import { Link } from 'react-router-dom';




export function MobileBottomNavLinks(props) {
  // console.log(props);
  // const [isActive, setIsActive] = useState(false);
  return (
    
    <BottomNavLinksContainer>
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
              // onClick={() => {
              //   setIsActive(true)
              // }}
              // activeStyle={ActiveLinkStyle}
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
          <LinkItem>
          <Link 
              to="/profile"
              style={LinkStyle}
            >
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
