import styled from 'styled-components';

export const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  height: 100%;
  list-style: none;
`;



export const LinkItem = styled.li`
  height: 100%;
  margin: 0 2.2em;
  
  color: #222;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  /* justify-content: center; */
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;
  &:hover {
    border-bottom: 2px solid #ffc43d;
    color: #ffc43d;
    padding: 0 1.5em;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  margin-bottom: 1em;
  color: inherit;
  font-size: inherit;
  width: 30px;
  height: 30px;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    
  }
`;