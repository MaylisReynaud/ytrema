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
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
`;

export const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  margin-bottom: 10px;
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

export const Marginer = styled.div`
  height: 2em;
`;