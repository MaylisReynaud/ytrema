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
  EmojiSunglasses1,
  backdropVariantsMobile
} from './style';
import Typed from 'typed.js';
import { useMediaQuery } from 'react-responsive';
import { LoginForm } from '../RegisterBox/Forms/LoginForm';
import { DeviceSize } from '../../Navbar/Responsive';
import ImgCouture from '../../../assets/images/registration-couture.jpg';

export function Login() {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
  const word = useRef(null);
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
  const [isExpanded, setExpanded] = useState(false);

  return (
    <>
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
                  <HeaderText>Bonjour !</HeaderText>
                  <EmojiSunglasses1 />
                  <SmallText>Content de vous revoir! </SmallText>
                  <SmallText> Connectez-vous pour accéder au contenu.</SmallText>
                </HeaderContainer>

              </TopContainer>
              <InnerContainer>
                <LoginForm />
              </InnerContainer>
            </BoxContainer>
          </RegistrationContainer>
        </Container>}

      {isMobile &&
      <div>coucou !!</div>

        // <BoxContainer>
        //   <TopContainer>
        //     <BackDrop
        //       initial={false}
        //       animate={isExpanded ? "expanded" : "collapsed"}
        //       variants={backdropVariantsMobile}
        //       transition={expandingTransition}
        //     />

        //     <HeaderContainer>
        //       <HeaderText>
        //         Bonjour
        //         <EmojiSunglasses1 />
        //       </HeaderText>

        //       <SmallText>Content de vous revoir! </SmallText>
        //       <SmallText> Connectez-vous pour accéder au contenu.</SmallText>
        //     </HeaderContainer>

        //   </TopContainer>
        //   <InnerContainer>
        //     <LoginForm />
        //   </InnerContainer>
        // </BoxContainer>
      }
    </>


  )
}