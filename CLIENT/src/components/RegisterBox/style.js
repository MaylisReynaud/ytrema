import styled from 'styled-components';
import { motion } from 'framer-motion';
import { EmojiSunglasses } from '@styled-icons/bootstrap';
import { EmojiHand } from '@styled-icons/fluentui-system-regular';

export const BoxContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
background-color: #fff;
position: relative;
overflow: hidden;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.8rem;
  padding-top: 5em;
`;

export const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 0% 0% 50% 70%;
  transform: rotate(150deg);
  top: -30px;
  left: -20px;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

export const HeaderContainer = styled.div`
  width: 100%;
  /* margin-top: 2rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Dala Floda Web Roman No. 2 Regular';
`;

export const HeaderText = styled.h2`
  font-size: 2rem;
  /* font-weight: 600; */
  line-height: 1.24;
  text-align: center;
  color: #fff;
  z-index: 10;
`;
export const EmojiSunglasses1 = styled(EmojiSunglasses)`
  width: 25px;
  height:25px;
  color: #fff;
  z-index:13;
  margin: 0.5rem;
`;

export const EmojiHello = styled(EmojiHand)`
  width: 25px;
  height:25px;
  color: #fff;
  z-index:12;
  margin: 0.5rem;
`;

export const SmallText = styled.h5`
  color: #fff;
  font-family: "ProximaNova-Regular"; 
  text-align: center;
  font-weight: 550;
  font-size: 1.1rem;
  z-index: 10;
  margin: 0;
  margin-top: 5px;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10rem;
`;

export const backdropVariants = {
  expanded: {
    width: "190%",
    height: "2050px",
    borderRadius: "55% 55% 0 0",
    transform: "rotate(-5deg)",
  },
  collapsed: {
    width: "110%",
    height: "302px",
    borderRadius: "55% 55% 0 0",
    transform: "rotate(180deg)",
  },
};

export const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
  delay: 0.1,
};