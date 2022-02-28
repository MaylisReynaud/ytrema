import React, { useRef, useEffect } from 'react';
import { Container,
        ImgContainer,
        ImgOverlay,
        ImgOverlayText,
        ImgOverlayTypedText,
        RegistrationContainer,
        RegistrationImg,
} from './style';
import Typed from 'typed.js';
import { useMediaQuery } from 'react-responsive';
import {RegisterBox} from './RegisterBox';
import { DeviceSize } from '../Navbar/Responsive';
import ImgCouture from '../../assets/images/registration-couture.jpg';

export function Registrationpage() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const word = useRef(null);
  useEffect (() => {
      const typed = new Typed(word.current, {
          strings: ['CONNECTÉS', 'PASSIONNÉS', 'ORGANISÉS' ],
          startDelay: 500,
          typeSpeed: 200,
          backSpeed: 100,
          backDelay: 300,
          loop: true,
          smartBackspace: true
      });
      return () => {
          typed.destroy();
      };
  }, []);
  return (
    <>
    {!isMobile &&
      <Container>
        <ImgContainer>
          <ImgOverlay>
            <ImgOverlayText>
            REJOIGNEZ LE GANG DES COUTURIERS <ImgOverlayTypedText ref={word}/> & DONNEZ UN NOUVEL ÉLAN À VOS PROJETS COUTURE !
            </ImgOverlayText>
          </ImgOverlay>
          <RegistrationImg src={ImgCouture} alt="Robe Clématisse Pattern cousue et portée par Maÿlis" />
        </ImgContainer>
        <RegistrationContainer>
          <RegisterBox />
        </RegistrationContainer>
    </Container> }
    </>
    
    
  )
}

