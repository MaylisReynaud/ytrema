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
        height: 82%;
  }
`;

export const ModalWrapper = styled.div`
    position: relative;
    z-index:100;
    width: 800px;
    height:80vh;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    color: #000;
    background-color: ${props => props.theme.color4};     
    border-radius: 10px;
    @media screen and (min-width:601px) { 
        top: 0;
        height:95%;

  }
`;



export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    /* grid-template-columns: 1fr 1fr; */
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
`;

export const CloseModalButton = styled(Close)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;