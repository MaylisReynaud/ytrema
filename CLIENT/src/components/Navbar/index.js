import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Logo } from '../Navbar/Logo';
import { Connection } from '../Navbar/Connection';
import { NavLinks } from '../Navbar/NavLinks';
import { DeviceSize } from '../Navbar/Responsive';
import { MobileNavLinks } from '../Navbar/MobileNavLinks';
import { NavbarContainer,
         LeftSection,
         MiddleSection,
         RightSection,
} from './style';


export function Navbar(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  return (
 
     <NavbarContainer>
        <LeftSection>
          <Logo />
        </LeftSection>
        <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
        <RightSection>
          {!isMobile && <Connection />}
          {isMobile && <MobileNavLinks />}
        </RightSection>
      </NavbarContainer>
     
 
     
  

    
  );   
};


