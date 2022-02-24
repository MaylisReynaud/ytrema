import React from 'react';
import { Container,
        ImgContainer,
        ImgOverlay,
        ImgOverlayText,
        RegistrationContainer,
        RegistrationImg,
} from './style';
import {RegisterBox} from '../RegisterBox';

import ImgCouture from '../../assets/images/registration-couture.jpg';

export function Registrationpage() {
  return (
    <Container>
        <ImgContainer>
          <ImgOverlay>
            <ImgOverlayText>
            REJOIGNEZ LE GANG DES COUTURIERS CONNECTÉS & DONNEZ UN NOUVEL ÉLAN À VOS PROJETS COUTURE !
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