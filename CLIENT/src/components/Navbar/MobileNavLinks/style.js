import styled from 'styled-components';
// import { Link, NavLink } from 'react-router-dom';


export const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 60px;
  left : 30px;
`;

export const LinkItem = styled.li`
  width: 100%;
  padding: 1em 1.3em;
  color: #264653;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  margin-bottom: 10px;
  /* height: 100%; */
  /* padding: 0 1.3em;
  color: #222;
  font-weight: 500;
  font-size: 16px; */
  
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;
  &:hover {
    border-bottom: 2px solid #ffc43d;
    color: #ffc43d;
  }
`;

export const ImgSpan = styled.span`
  width: 30px;
  height:30px; 
  margin-right: 1em;
`;


// export const LinkNav = styled(Link)`
//   text-decoration: none;
//   color: inherit;
//   font-size: inherit;
// `;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  font-family: 'ProximaNova-Regular';
  font-weight: 600;
`;

export const Marginer = styled.div`
  height: 2em;
`;