import styled from 'styled-components';
import { DeviceSize } from '../Navbar/Responsive';

export const Slide = styled.div`
    /* height: 100vw !important; */
`;

export const SlideImg = styled.img`
    height:100%;
    @media screen and (max-width:600px) { 
        width: 100vw !important;
        height: 40vh;
        object-fit: cover;
  }
`;

export const SlideOverlay = styled.div`
    width: 80%;
    position : absolute;
    top: 50%;
    transform: translateY(-50%);
    left:10%;
    padding: 0.4rem;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.53);
    color: #242634;
`;

export const SlideOverlayH2 = styled.h2`
    font-family: 'Inconsolata';
    font-size: 1.3rem;
    margin: 0.4rem;
`;

export const SlideOverlayH1 = styled.h1`
    font-family: 'Dala Floda Web Roman No. 2 Regular';
    font-size: 2rem;
    font-weight: bold;
    margin: 0.4rem;
`;

export const SlideOverlayText = styled.p`
    font-family: 'ProximaNova-Regular';
    font-size: 1.3rem;
    margin: 0.4rem;
`;
export const SlideButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`;

export const SlideButton = styled.button`
    border: 0;
    outline: 0;
    padding: 8px 1em;
    color: #242634;
    font-size: 13px;
    font-family: 'ProximaNova-Regular';
    font-weight: 600;
    letter-spacing: 1px;
    border-radius: 20px;
    background-color: #ffc43d;;
    transition: all 240ms ease-in-out;
    cursor: pointer;
        &:hover {
            color:#ffc43d;
            background-color: #2a9d8f;
  }
`;
