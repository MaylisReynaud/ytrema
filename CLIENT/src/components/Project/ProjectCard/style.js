import styled from 'styled-components';
import { ArrowSmLeft } from "@styled-icons/heroicons-outline";
import { Link as LinkS} from 'react-scroll';
export const Container = styled.div`
  display: flex;
    flex-direction: column;
    height: 70vh;
    /* height: 74vh; */
    width:100%;
    overflow-y:hidden;
  
  background-color: lightpink;
  @media screen and (min-width: 601px) {
    /* height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    
  } */
}
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100%;
  width: 100%;
  background-color: red;
  padding:.5rem 0;
  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ArrowTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  @media screen and (min-width: 601px) {
    }
`;
export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  padding-left: .5rem;
  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const ReturnArrow = styled(ArrowSmLeft)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-left: 0.8em;
  color: ${(props) => props.theme.color3};
  @media screen and (min-width: 601px) {
    /* left: 1.5rem; */
  }
`;
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const ProjectTitle = styled.h1`
  font: 1.1rem "${(props) => props.theme.textFont}";
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.color2};
  @media screen and (min-width: 601px) {
  }
`;
export const NavProject = styled.div`
  display: flex;
  flex-direction: row;
  background-color: greenyellow;
  align-items: center;
  margin: .8rem 0;
`;
export const ProjectLinksContainer = styled.div`
    justify-content: center;
    width: 100%;
    height: 3rem;;
    background-color: ${props => props.theme.color2};
`;
export const LinksWrapper = styled.ul`
 /* position: relative; */
  box-shadow: 2px #222;
  margin: 0 auto;
  padding: 0.5em 0;
  height: 100%;
  list-style: none;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-around;
`;
export const LinkItem = styled.li`
  height: 100%;
  margin: 1rem 0;
`;
export const ProjectMenuLinks = styled(LinkS)`
  color: ${props => props.theme.color5};
  display: flex;
  align-items: center;
  font-size: .9rem;
  transition: all 220ms ease-in-out;
  font-family: ${props => props.theme.textFont};
  text-decoration: none;
  padding: 0 1rem;
  height:100%;
  cursor:pointer;
  &.active {
    border-bottom: 2px solid ${props => props.theme.color1};
  }
`;
