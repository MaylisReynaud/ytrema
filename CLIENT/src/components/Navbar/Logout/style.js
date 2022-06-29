import styled from 'styled-components';
import {motion} from 'framer-motion';

export const ConnectionContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-right: 1.3em;
`;

export const buttonVariants = {
  hover: {
    scale: 1.10,
    textShadow: '0px 0px 8px rgb(255, 255, 255)',
    boxShadow: '0px 0px 8px rgb(255, 255, 255)',
  },
  tap :{
    scale: 0.95,
  }
};

export const LogoutButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: ${props => props.theme.color1};
  font-size: 13px;
  font-family: '${props => props.theme.textFont}';
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid ${props => props.theme.color1};
  transition: 1s box-shadow;
  cursor: pointer;
  &:hover {
    transition: all, 240ms ease-in-out;
    color: ${props => props.theme.color4};
    background: rgb(241, 196, 15);
    background: linear-gradient(
      58deg,
      rgba(241, 196, 15, 1) 20%,
      rgba(243, 172, 18, 1) 100%
    );
  }
`;