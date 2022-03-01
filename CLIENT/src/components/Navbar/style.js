import styled from 'styled-components';

export const GlabalContainer = styled.div`
width: 100%;
height: 100%;

`;

export const NavbarContainer = styled.div`
width: 100%;
height: 60px;
box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
display: flex;
align-items: center;
padding: 0 1.5em;
position: sticky;
top:0;
background-color: ${props => props.theme.color4};

`;

export const LeftSection = styled.div`
display: flex;
`;

export const MiddleSection = styled.div`
display: flex;
flex: 2;
height: 100%;
justify-content: center;
`;

export const RightSection = styled.div`
display: flex;
`;

export const FooterNavbarContainer = styled.div`
width: 100%;
height: 60px;
position: fixed;
bottom:0;
left:0;
box-shadow: 2px #222;
display: flex;
align-items: center;
padding: 0 1.5em;
`;