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
    background-color: #242634;
 

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
`;



export const LinkItem = styled.li`
  height: 100%;
  margin: 0 22px;
  color: #fff;
  font-size: 14px;
  transition: all 220ms ease-in-out;
   &:hover {
    color: #ffc43d;
  }
`;


export const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  font-family: 'ProximaNova-Regular';
  width: 30px;
  height: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImgContainer = styled.div`
  width: 25px;
  height:25px;
  margin-bottom: 0.4em;
`;

export const ScrollIcon = styled(Scroll)`
  width: 25px;
  height:25px;
`;

export const ApparelIcon = styled(Apparel)`
  width: 25px;
  height:25px;
`;

export const BookOpenIcon = styled(BookOpen)`
  width: 25px;
  height:25px;
`;

export const FlowerIcon = styled(Flower1)`
  width: 25px;
  height:25px;
`;

export const PersonIcon = styled(Person)`
  width: 25px;
  height:25px;
`;