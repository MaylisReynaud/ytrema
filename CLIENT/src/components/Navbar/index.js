import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Logo } from '../Navbar/Logo';
import { DesktopConnection } from './DesktopConnection';
import { Logout } from '../Navbar/Logout';
import { NavLinks } from '../Navbar/NavLinks';
import { DeviceSize } from '../Navbar/Responsive';
import { MobileNavLinks } from '../Navbar/MobileNavLinks';
import { useSelector } from "react-redux";
import { NavbarContainer,
         LeftSection,
         MiddleSection,
         RightSection,
} from './style';


export function Navbar(props) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const isLogged = auth.isLogged;
  const activeSession = sessionStorage.getItem("token");
  return (
 
     <NavbarContainer>
        <LeftSection>
          <Logo />
        </LeftSection>
        <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
        <RightSection>
        {isLogged === true && activeSession  ? (
          !isMobile && <Logout />) : (
            !isMobile && <DesktopConnection />
          )}
          {isMobile && <MobileNavLinks />}
        </RightSection>
      </NavbarContainer>
  
  );   
};




