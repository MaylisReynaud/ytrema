import styled from 'styled-components';
import { DeviceSize } from '../Navbar/Responsive';

export const Slide = styled.div`
    @media screen and (min-width:601px) { 
        height: 90vh;
  }
`;

export const SlideImg = styled.img`
    /* height:100%; */
    @media screen and (max-width:600px) { 
        /* width: 100vw ; */
        /* height: 35vh; */
        object-fit:cover;
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
    color: ${props => props.theme.color5};
`;

export const SlideOverlayH2 = styled.h2`
    font-family: '${props => props.theme.subtitleFont}';
    font-size: 1.3rem;
    margin: 0.4rem;
`;

export const SlideOverlayH1 = styled.h1`
    font-family: '${props => props.theme.titleFont}';
    font-size: 2rem;
    font-weight: bold;
    margin: 0.4rem;
`;

export const SlideOverlayText = styled.p`
    font-family: '${props => props.theme.textFont}';
    font-size: 1.3rem;
    margin: 0.4rem;
`;
