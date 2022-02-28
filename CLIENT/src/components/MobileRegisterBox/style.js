import styled from 'styled-components';
import { motion } from 'framer-motion';
import { EmojiSunglasses } from '@styled-icons/bootstrap';
import { EmojiHand } from '@styled-icons/fluentui-system-regular';

export const BoxContainer = styled.div`
width: 100%;
min-height: 320px;
display: flex;
flex-direction: column;
background-color: #fff;
/* box-shadow: 0 0 2px rgba(15, 15, 15, 0.28); */
position: relative;
overflow: hidden;
margin-top: 0.1rem;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.8rem;
  padding-bottom: 5em;
`;

export const BackDrop = styled(motion.div)`
  width: 190%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(150deg);
  top: -400px;
  left: -85px;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Dala Floda Web Roman No. 2 Regular';
  padding-top:1rem;
`;

export const HeaderText = styled.h2`
  font-size: 2rem;
  /* font-weight: 600; */
  line-height: 1.24;
  text-align: center;
  color: #fff;
  z-index: 10;
  /* margin: 0; */
`;
export const EmojiSunglasses1 = styled(EmojiSunglasses)`
  width: 25px;
  height:25px;
  color: #fff;
  z-index:11;
  margin: 0.5rem;
`;

export const EmojiHello = styled(EmojiHand)`
  width: 25px;
  height:25px;
  color: #fff;
  z-index:11;
  margin: 0.5rem;
`;

export const SmallText = styled.h5`
  color: #fff;
  font-family: "ProximaNova-Regular"; 
  text-align: center;
  font-weight: 550;
  font-size: 1rem;
  z-index: 10;
  margin: 0;
  margin-top: 0.4rem;
  padding-left: 2.8rem;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

export const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

export const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
  delay: 0.1,
};