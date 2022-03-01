import styled from 'styled-components';


export const FooterContainer = styled.div`
    justify-content: center;
    position: relative ;
    width: 100%;
    height: 60px;
    background-color: ${props => props.theme.color2};
    color: ${props => props.theme.color4};
`;

export const LinksWrapper = styled.ul`
  position: relative;
  box-shadow: 2px #222;
  margin: 0 auto;
  padding: 1rem;
  height: 100%;
  list-style: none;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;



export const LinkItem = styled.li`
  height: 100%;
  margin: 0 22px;
  color: ${props => props.theme.color4};
  font-family: ${props => props.theme.textFont};
  font-size: 1em;
  transition: all 220ms ease-in-out;
  cursor: pointer;
   &:hover {
    color: ${props => props.theme.color1};
  }
`;

export const ParagraphItem = styled.p`
  text-decoration: none;
  color: inherit;
  font-family: ${props => props.theme.textFont};
  font-size: 1em;
  height: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
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
