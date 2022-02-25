import styled from 'styled-components';


export const Container = styled.div`
    width:100%;
    height:100vh;
    display: flex;

`;

export const ImgContainer = styled.div`
    width: 28%;
    height:100%;
    overflow: hidden;

`;

export const RegistrationContainer = styled.div`
    width:72%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RegistrationImg = styled.img`
    object-fit: cover;
  


    
`;

export const ImgOverlay = styled.div`
    position: relative;


`;

export const ImgOverlayText = styled.h2`
    z-index: 100;
    position: absolute;
    color: white;
    top: 2rem;
    text-align: center;
    margin: 1rem;
    font-family: "ProximaNova-Regular"; 
    /* font-style: bold italic; */
    font-size: 2rem;
    line-height: 2.5rem;
    text-transform: lowercase;

    &&::first-letter{
        text-transform: uppercase;
    } 
`;

export const ImgOverlayTypedText = styled.span`

    color: #ffc43d;
    font-family: 'Dala Floda Web Roman No. 2 Regular'; 
    /* font-style: bold italic; */
    font-size: 2rem;
    line-height: 2.5rem;
    text-transform: lowercase;

    &&::first-letter{
        text-transform: uppercase;
    } 
`;