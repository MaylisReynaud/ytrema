import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Close } from '@styled-icons/evaicons-solid';

export const Container = styled(motion.div)`
    width: 280px;
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
    justify-content: center;
    z-index:100;
    width: 800px;
    height:80vh;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    color: #000;
    background-color: ${props => props.theme.color4};     
    border-radius: 10px;
    @media screen and (min-width:601px) { 
        margin-top: 4em;
        margin-bottom: 4em;
        height:80%;

  }
`;



export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: ${props => props.theme.color5};
    overflow: hidden;
    height:86vh;

    h1 {
        font-family: '${props => props.theme.titleFont}';
        font-weight: bold;
        margin-right: 1.5rem;
        font-size: 1.5rem;
        color: ${props => props.theme.color3};
    }
    @media screen and (min-width:601px) { 
        height:92%;
        width: 90%;

  }
`;

export const CloseModalButton = styled(Close)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 1002;
    
`;