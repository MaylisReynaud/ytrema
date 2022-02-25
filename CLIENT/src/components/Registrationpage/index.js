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
import {RegisterBox} from '../RegisterBox';

import ImgCouture from '../../assets/images/registration-couture.jpg';

export function Registrationpage() {
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
    </Container>
  )
}

//            REJOIGNEZ LE GANG DES COUTURIERS CONNECTÉS & DONNEZ UN NOUVEL ÉLAN À VOS PROJETS COUTURE !