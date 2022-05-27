import styled from 'styled-components';
import {motion} from 'framer-motion';
import { DeviceSize } from '../Navbar/Responsive';
import { MinusSm } from '@styled-icons/heroicons-solid';
import { PlusSm } from '@styled-icons/heroicons-solid';
import { Link } from 'react-router-dom';

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const ButtonContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
`;

export const Title = styled.h1`
    color: ${props => props.theme.color3};
    font-family: '${props => props.theme.titleFont}';
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
`;
export const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  height:80%;
  overflow-y:hidden;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 78vh;
    width:100%;
    overflow-y:hidden;
   
    @media screen and (min-width:601px) { 
        flex-direction: row;
        height:100%;

        
  }
`;


export const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 10vh;
    width:100%;
    margin: 1rem 0;
    @media screen and (min-width:601px) { 
      justify-content: unset;
  }
`;
export const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 90%;
    //hide the scrollbar on IE, Firefox, Chrome, Safari, Opera
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
    display: none;}
    overflow-y: scroll;
    
    width:17%;
    margin:1rem 2rem;


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
  @media screen and (min-width:601px) { 
    width:100%;  
    padding: 0.5rem 1.2rem;
  }
`;

export const Button = styled(motion.button)`
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

`;

export const FilterSpan = styled.span`
    height: 1.3rem;
    width: 1.3rem;
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

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-evenly;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
    display: none;}
    overflow-y: scroll;
    height:100vh;
    width:100%;
   
    @media screen and (min-width:601px) { 
      height:95vh;

    }
  `;
  export const CardsMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:45%;
  margin: .5rem;
  /* box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (min-width:601px) { 
    width:20%;
  }
`;



export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:12rem;
  @media screen and (min-width:601px) { 
    width:100%;
  }
`;
 export const CardLink = styled.link`
  cursor: pointer;
 `;

export const ImgContainer = styled.div`
  height:65%;
`;

export const CardImg = styled.img`
  background-color: ${props => props.theme.color1};
  object-fit: cover;
  width:100%;
  height:100%;
`

export const CardText = styled.h3`
  text-align: center;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.color4};
  height: 8rem;
  width:100%;
  padding: 0 .3rem;
  font : 0.9rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color5};
  border-bottom: 2px solid ${props => props.theme.color1};
  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  /* flex-grow:1; */
  flex-direction: column;
  flex-shrink:1;
  margin-top: 0.3rem;
  @media screen and (min-width:601px) { 
    height:100%;
    /* width: 100%;
    display: flex;
    flex-direction: column; */
    /* overflow-y: visible; */
    margin-top: 1rem;
    margin-bottom: 1rem;
    
  }
`;


export const FilterTitle = styled.h2`
  font : 1.2rem/1.5 '${props => props.theme.textFont}';
  font-weight: 700;
  color: ${props => props.theme.color5};
  margin: 0.1rem 1rem;
  position: relative;
  @media screen and (min-width:601px) { 
    margin: 0.5rem 1rem;
  }
`;


export const MinusIcon = styled(MinusSm)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    position: absolute;
    top: 5px;
    right: 10px;
    width: 20px;
    height: 20px;
    padding: 0;
    z-index: 100;
`;

export const PlusIcon = styled(PlusSm)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    position: absolute;
    top: 5px;
    right: 10px;
    width: 20px;
    height: 20px;
    padding: 0;
    z-index: 100;
`;

export const ErrorText = styled.h2`
font : 1.2rem/1.5 '${props => props.theme.textFont}';
font-weight: 700;
text-align: center;
color: ${props => props.theme.color2};
margin: 4rem;
@media screen and (min-width:601px) { 
  margin:4rem;
}
`;

export const SignupLink = styled(Link)`
cursor: pointer;
`;

export const ErrorButton = styled(motion.button)`
  border: 0;
  outline: 0;
  padding: 0.7em 1em;
  margin: 2em 4em;
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
  @media screen and (min-width:601px) { 
    width:100%;  
    padding: 0.5rem 1.2rem;
  }
`;