import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Dala Floda Web Roman No. 2';
    }
`

export const NavbarContainer = styled.nav`
    width: 100%;
    height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
    box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    flex-direction: column;

    @media (min-width: 700px) {
        height: 80px;
    }
`;

export const LeftContainer = styled.div`
    display: flex;
`;

export const MiddleContainer = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    justify-content: center;
`;

export const RightContainer = styled.div`
    display: flex;
`;

export const NavbarInnerContainer = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
`;

export const NavbarLinkContainer = styled.div`
    display: flex;
`;

export const NavbarLink = styled(Link)`
    color: #264653;
    font-size: x-large;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin : 10px;

    @media (max-width: 700px) {
        display: none;
    }
`
export const NavbarLinkExtended = styled(Link)`
    color: white;
    font-size: x-large;
    font-family:Arial, Helvetica, sans-serif;
    text-decoration: none;
    margin : 10px;
    
`;

export const Logo = styled.img`
    max-width: 200px;
    height: auto;
`;
export const OpenLinksButton = styled.button`
    width: 70px;
    height: 50px;
    background: none;
    color: #264653; 
    border: none;
    font-size: 45px;
    cursor: pointer;

    @media  (min-width: 700px) {
        display: none;
    }
`;

export const NavbarExtendedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 700px) {
        display: none;
    }
`;