import React, { useState } from 'react';
import { LoginForm } from './Forms/LoginForm';
import { RegisterContext } from './registerContext';
import { useMediaQuery } from 'react-responsive';
import { SignupForm } from './Forms/Signup';
import {
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
  EmojiHello,
  backdropVariantsMobile
} from './style';
import { DeviceSize } from '../../Navbar/Responsive';

export function RegisterBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <>
      {isMobile &&
        <RegisterContext.Provider value={contextValue}>
          <BoxContainer>
            <TopContainer>
              <BackDrop
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={backdropVariantsMobile}
                transition={expandingTransition}
              />
              {active === "signin" && (
                <HeaderContainer>
                  <HeaderText>
                    Bonjour 
                    <EmojiSunglasses1 />
                  </HeaderText>

                  <SmallText>Content de vous revoir! </SmallText>
                  <SmallText> Connectez-vous pour accéder au contenu.</SmallText>
                </HeaderContainer>
              )}
              {active === "signup" && (
                <HeaderContainer>
                  <HeaderText>Créez votre compte</HeaderText>
                  <EmojiHello />
                  <SmallText>Bienvenue sur ÿ tréma </SmallText>
                </HeaderContainer>
              )}
            </TopContainer>
            <InnerContainer>
              {active === "signin" && <LoginForm />}
              {active === "signup" && <SignupForm />}
            </InnerContainer>
          </BoxContainer>
        </RegisterContext.Provider>}

      {!isMobile &&
        <RegisterContext.Provider value={contextValue}>
          <BoxContainer>
            <TopContainer>
              <BackDrop
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={backdropVariants}
                transition={expandingTransition}
              />
              {active === "signin" && (
                <HeaderContainer>
                  <HeaderText>Bonjour !</HeaderText>
                  <EmojiSunglasses1 />
                  <SmallText>Content de vous revoir! </SmallText>
                  <SmallText> Connectez-vous pour accéder au contenu.</SmallText>
                </HeaderContainer>
              )}
              {active === "signup" && (
                <HeaderContainer>
                  <HeaderText>Créez votre compte</HeaderText>
                  <EmojiHello />
                  <SmallText>Bienvenue sur ÿ tréma </SmallText>
                </HeaderContainer>
              )}
            </TopContainer>
            <InnerContainer>
              {active === "signin" && <LoginForm />}
              {active === "signup" && <SignupForm />}
            </InnerContainer>
          </BoxContainer>
        </RegisterContext.Provider>
      }

    </>
  )
};