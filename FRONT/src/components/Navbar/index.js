import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
import {
    NavbarContainer, 
    RightContainer, 
    LeftContainer, 
    NavbarInnerContainer, 
    NavbarExtendedContainer, 
    NavbarLinkContainer, 
    NavbarLink,
    Logo,
    OpenLinksButton,
    NavbarLinkExtended
} from "./Navbar.style";
import LogoImg from '../../assets/logo-ytrema-site.png';

 
function Navbar () {
    const [extendNavbar, setExtendNavbar] = useState(false);

    return (
        <NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                <LeftContainer>
                    <Logo src= {LogoImg} alt="ÿ tréma logo"></Logo>
                </LeftContainer>
                <RightContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/"> Accueil</NavbarLink>
                        <NavbarLink to="/SeConnecter"> Se connecter</NavbarLink>
                        <NavbarLink to="/Senregistrer"> S'enregistrer</NavbarLink>
                        <OpenLinksButton 
                            onClick={() => {
                                setExtendNavbar((currentValue) => !currentValue);
                        }} 
                        >
                           {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
                        </OpenLinksButton>
                    </NavbarLinkContainer>
                </RightContainer>
            </NavbarInnerContainer>
            {extendNavbar && (
                <NavbarExtendedContainer>
                    <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
                    <NavbarLinkExtended to="/SeConnecter"> Contact</NavbarLinkExtended>
                    <NavbarLinkExtended to="/Senregistrer"> S'enregistrer</NavbarLinkExtended>
                </NavbarExtendedContainer> 
            )}
         </NavbarContainer>
    )
}

export default Navbar;