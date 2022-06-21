import styled from 'styled-components';
import  { Apparel } from '@styled-icons/zondicons';
import { BookOpen } from '@styled-icons/fa-solid';
import { Scroll } from '@styled-icons/fa-solid/Scroll';
import { Flower1 } from '@styled-icons/bootstrap';
import { Person } from '@styled-icons/open-iconic';



export const BottomNavLinksContainer = styled.div`
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: ${props => props.theme.color5};
    margin-top: .5em;
`;

export const LinksWrapper = styled.ul`
  /* display: flex; */
  position: relative;
  box-shadow: 2px #222;
  margin: 0 auto;
  padding: 0.5em 0;
  height: 100%;
  list-style: none;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-evenly;
`;



export const LinkItem = styled.li`
  height: 100%;
  margin: 0 22px;
  color: ${props => props.theme.color4};
  font-size: 14px;
  transition: all 220ms ease-in-out;
  font-family: ${props => props.theme.textFont};
  text-decoration: none;

   
`;


export const LinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  fontSize: 'inherit',
  fontFamily: 'ProximaNova-Regular',
  width: '30px',
  height: '30px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const ActiveLinkStyle = {
  textDecoration: 'none',
  color: '#ffc43d',
  fontSize: 'inherit',
  fontFamily: 'ProximaNova-Regular',
  width: '30px',
  height: '30px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const IconContainer = styled.div`
  width: 25px;
  height:25px;
  margin-bottom: 0.4em;
`;

export const IconStyle = {
  width: '25px',
  height: '25px'
};
  
