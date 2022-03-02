import styled from 'styled-components';
import {motion} from 'framer-motion';


export const Title = styled.h1`
    color: ${props => props.theme.color3};
    font-family: '${props => props.theme.titleFont}';
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width:100%;
    background-color: #ddd;
`;

export const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 10vh;
    width:100%;
    background-color: #222;
    margin:0;
`;

export const RegisterArticleButton = styled(motion.button)`
  border: 0;
  outline: 0;
  padding: 0.7em 1em;
  color: ${props => props.theme.color4};
  font-size: 1.1rem;
  font-family: '${props => props.theme.textFont}';
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 10px;
  background: rgb(241, 196, 15);
    background: linear-gradient(
      58deg,
      rgba(241, 196, 15, 1) 20%,
      rgba(243, 172, 18, 1) 100%
    );
  border: 2px solid ${props => props.theme.color1};
  transition: 1s box-shadow;
  cursor: pointer;
  &:hover {
    transition: all, 240ms ease-in-out;
    color: ${props => props.theme.color4};
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  };
`;

export const FiltersButton = styled(motion.button)`
  border: 0;
  outline: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0.7em 1em;
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
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  };
`;

export const FilterSpan = styled.span`
    height: 20px;
    width: 20px;
    margin-right: 0.3rem;
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