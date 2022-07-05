import React, { useRef, useEffect, useState } from 'react';
import {
  Container,
  ImgContainer,
  ImgOverlay,
  ImgOverlayText,
  ImgOverlayTypedText,
  RegistrationContainer,
  RegistrationImg,
  TopContainer,
  BoxContainer,
  BackDrop,
  HeaderContainer,
  HeaderText,
  SmallText,
  InnerContainer,
  backdropVariants,
  expandingTransition,
  EmojiHello,
  backdropVariantsMobile
} from './style';
import Typed from 'typed.js';
import { useMediaQuery } from 'react-responsive';
import { SignupForm } from '../RegisterBox/Forms/Signup';
import { DeviceSize } from '../../Navbar/Responsive';
import { Slider } from '../../Carousel';
import ImgCouture from '../../../assets/images/registration-couture.jpg';

export function Signup() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
  const word = useRef(null);
  {
    isDesktop &&
      useEffect(() => {
        const typed = new Typed(word.current, {
          strings: ['CONNECTÉS', 'PASSIONNÉS', 'ORGANISÉS'],
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
  }

  const [isExpanded, setExpanded] = useState(false);

  return (
    <>
      {isMobile &&
        <>
          <Slider />
          <BoxContainer>
            <TopContainer>
              <BackDrop
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={backdropVariantsMobile}
                transition={expandingTransition}
              />

              <HeaderContainer>
                <HeaderText>Créez votre compte</HeaderText>
                <EmojiHello />
                <SmallText>Bienvenue sur ÿ tréma </SmallText>
              </HeaderContainer>
            </TopContainer>
            <InnerContainer>
              <SignupForm />
            </InnerContainer>
          </BoxContainer>
        </>
      }
      {isDesktop &&
        <Container>
          <ImgContainer>
            <ImgOverlay>
              <ImgOverlayText>
                REJOIGNEZ LE GANG DES COUTURIERS <ImgOverlayTypedText ref={word} /> & DONNEZ UN NOUVEL ÉLAN À VOS PROJETS COUTURE !
              </ImgOverlayText>
            </ImgOverlay>
            <RegistrationImg src={ImgCouture} alt="Robe Clématisse Pattern cousue et portée par Maÿlis" />
          </ImgContainer>
          <RegistrationContainer>
            <BoxContainer>
              <TopContainer>
                <BackDrop
                  initial={false}
                  animate={isExpanded ? "expanded" : "collapsed"}
                  variants={backdropVariants}
                  transition={expandingTransition}
                />

                <HeaderContainer>
                  <HeaderText>Créez votre compte</HeaderText>
                  <EmojiHello />
                  <SmallText>Bienvenue sur ÿ tréma </SmallText>
                </HeaderContainer>
              </TopContainer>
              <InnerContainer>
                <SignupForm />
              </InnerContainer>
            </BoxContainer>
          </RegistrationContainer>
        </Container>}
    </>
  )
}