import styled from 'styled-components';
import  { Apparel } from '@styled-icons/zondicons';
import { BookOpen } from '@styled-icons/fa-solid';
import { Scroll } from '@styled-icons/fa-solid/Scroll';
import { Flower1 } from '@styled-icons/bootstrap';
import {NavLink, Link} from 'react-router-dom'


export const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinksWrapper = styled.ul`
  display: flex;
  margin: 0 auto;
  padding: 0.5em 0.5em;
  height: 100%;
  list-style: none;
`;



export const LinkItem = styled.li`
  height: 100%;
  margin: 0 2em;
  color: #264653;
  font-weight: 500;
  font-size: 14px;
  transition: all 220ms ease-in-out;
  &:hover {
    color: #ffc43d;
  }
`;


export const Links = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  width: 30px;
  height: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
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