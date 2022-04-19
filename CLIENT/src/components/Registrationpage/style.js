import styled from 'styled-components';


export const Container = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    margin:0;
    padding:0;
 
`;

export const ImgContainer = styled.div`
    width: 28%;
    height:100%;
    overflow: hidden;





`;

export const RegistrationContainer = styled.div`
    width:72%;
    height:100%;
    display: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RegistrationImg = styled.img`
    /* object-fit: cover; */
    width:100%;
    height: 100% ;
    background-size:cover;
    background-position: 50% 50%;    
`;

export const ImgOverlay = styled.div`
    position: relative;


`;

export const ImgOverlayText = styled.h2`
    z-index: 100;
    position: absolute;
    color: ${props => props.theme.color4};
    top: 2rem;
    left: 2rem;
    max-width:80%;
    text-align: center;
    margin: 1rem;
    font-family: '${props => props.theme.textFont}'; 
    /* font-style: bold italic; */
    font-size: 2rem;
    line-height: 2.5rem;
    text-transform: lowercase;

    &&::first-letter{
        text-transform: uppercase;
    } 
`;

export const ImgOverlayTypedText = styled.span`

    color: ${props => props.theme.color1};
    font-family: '${props => props.theme.titleFont}'; 
    /* font-style: bold italic; */
    font-size: 2rem;
    line-height: 2.5rem;
    text-transform: lowercase;

    &&::first-letter{
        text-transform: uppercase;
    } 
`;