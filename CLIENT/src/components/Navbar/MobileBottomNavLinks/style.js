import styled from 'styled-components';
import  { Apparel } from '@styled-icons/zondicons';
import { BookOpen } from '@styled-icons/fa-solid';
import { Scroll } from '@styled-icons/fa-solid/Scroll';
import { Flower1 } from '@styled-icons/bootstrap';



export const BottomNavLinksContainer = styled.div`
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
`;

export const LinksWrapper = styled.ul`
  /* display: flex; */
  position: relative;
  box-shadow: 2px #222;
  margin: 0 auto;
  padding: 0.5em 0.5em;
  height: 100%;
  list-style: none;
  display:flex;
`;



export const LinkItem = styled.li`
  height: 100%;
  margin: 0 2em;
  color: #264653;
  font-weight: 500;
  font-size: 14px;
  transition: all 220ms ease-in-out;
  display: list-item inline;
  &:hover {
    color: #ffc43d;
  }
`;


export const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
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
  margin-bottom: 0.2em;
  width: 25px;
  height:25px;
`;

export const ApparelIcon = styled(Apparel)`
  margin-bottom: 0.2em;
  width: 25px;
  height:25px;
`;

export const BookOpenIcon = styled(BookOpen)`
  margin-bottom: 0.2em;
  width: 25px;
  height:25px;
`;

export const FlowerIcon = styled(Flower1)`
  margin-bottom: 0.2em;
  width: 25px;
  height:25px;
`;