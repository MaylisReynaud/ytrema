import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Close } from '@styled-icons/evaicons-solid';

export const Container = styled(motion.div)`
    width: 100%;
    min-height:850px;
    display:flex;
    flex-direction: column;
    position: absolute;
    top:0;
    left:0;
`;


export const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    position:fixed;
    justify-content:center;
    align-items:center;
    @media screen and (min-width:601px) { 
        height: 100%;
  }
`;

export const ModalWrapper = styled.div`
    position: relative;
    display: flex;
    z-index:100;
    width: 90%;
    height:30%;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    color: #000;
    background-color: ${props => props.theme.color4};     
    border-radius: 10px;
    &[class~="deleteAll"] {
        height:45%;
  }
    @media screen and (min-width:601px) { 
        height:27%;
        width: 35%;       
  }
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 1.2em;
    padding: 0;
    z-index: 10;
    line-height: 1.5;
    color: ${props => props.theme.color5};
    overflow: hidden;
    height:86%;
`;
export const TextContainer = styled.div`
    display: flex;
    justify-content:space-around;
    font-family: '${props => props.theme.titleFont}';
    margin: 0 1.5em;
    font-weight: bold;
    color: ${props => props.theme.color3};
    font-size: 1.5em;
`;
export const DeleteTitle = styled.h1`
    font-family: '${props => props.theme.titleFont}';
    margin: 0 1.5em 0.5em;
    font-weight: bold;
    color: ${props => props.theme.color3};
    font-size: 1.5em;
    @media screen and (min-width:601px) { 
        text-align:center;
        margin: 0 1.5em 0;

  }
`;

export const DeleteParagraph = styled.p`
    font-family: '${props => props.theme.textFont}';
    margin: 0 1.5em;
    font-size: 1.3em;
    color: ${props => props.theme.color5};
    @media screen and (min-width:601px) { 
        margin: .8em 1.5em;

  }
`;
export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0 1.5em 0.5em;
    height:4em;
    &[class~="deleteAll"] {
       margin-top:1rem;
  }
`;
export const CancelContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 60%;
    margin-right: 1em;

`;
export const CancelButton = styled.p`
        color: grey;
        font-family: '${props => props.theme.textFont}';
        font-size: 1em;
`;
export const DeleteContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 40%;


`;
export const DeleteButton = styled.button`
   background-color: red;
        width: 100%;
        padding: 0.5em;
        cursor:pointer;
        border-radius: 0.5em;
        border: 1px solid red;
        margin-right: 2em;
        color: ${props => props.theme.color4};
        font-family: '${props => props.theme.textFont}';
        font-size: 1em;
        font-weight: 600;
        &[class~="returnStock"] {
            background-color: ${props => props.theme.color2};
            border: 1px solid ${props => props.theme.color2};
  }
`;
export const CloseModalButton = styled(Close)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    padding: 0;
    z-index: 10;
`;