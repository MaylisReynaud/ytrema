import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Error404Container = styled.div`
    display: flex;
    flex-direction: column;
    height:90vh;
      align-items:center;

    @media screen and (min-width:601px) { 
      height:90vh;
      width:100%;
      
  }
`;
export const Image404Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5em;
    @media screen and (min-width:601px) { 
        height: 80%;
        margin-top:0;
        
  }
`;
export const Error404Image = styled.img`
  object-fit: contain;
  width:100%;
  height:100%;
`;
export const Button = styled(motion.button)`
  border: 0;
  outline: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0.7em 1em;
  width: 75%;
  margin-top: 4em;
  align-items:center;
  justify-content:center;
  color: ${props => props.theme.color1};
  font-size: 1.1rem;
  font-family: '${props => props.theme.textFont}';
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 10px;
  background: ${props => props.theme.color4};
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
  &:not(:last-of-type) {
    margin-right: 7px;
  };
  @media screen and (min-width:601px) { 
    width: 25%;
 
      
  }

`;
