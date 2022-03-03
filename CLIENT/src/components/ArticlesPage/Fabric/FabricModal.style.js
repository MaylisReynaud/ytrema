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
`;

export const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    position: relative;
    z-index:10;
    border-radius: 10px;
`;



export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;

    p {
        margin-bottom: 1rem;
    }

    button {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none
    }
`;

export const CloseModalButton = styled(Close)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;