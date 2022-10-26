import styled from 'styled-components';
import { ArrowSmLeft } from "@styled-icons/heroicons-outline";
import { PencilFill } from "@styled-icons/bootstrap";
import { Trash } from "@styled-icons/boxicons-solid";
import { Link as LinkS } from 'react-scroll';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    align-content: flex-start;
    /* height: 74vh; */
    width:100%;
    overflow-y:scroll;  
    @media screen and (min-width:601px) { 
        flex-direction: row;
        margin-bottom:3.5em;
        height:100%;        
  }
`;

export const HeaderContainer = styled.div`
   display: flex;
   position: sticky;
   top:0;
   background-color:${(props) => props.theme.color4};
   flex-direction: column;
  
    align-items: center;
    /* height: 7vh; */
    width:100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    /* margin: 1rem 0; */
    @media screen and (min-width:601px) { 
      justify-content: unset;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:3rem;
  width: 100%;
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

export const ProjectTitle = styled.h1`
  font: 1.5rem "${(props) => props.theme.textFont}";
  font-weight: 800;
  /* text-align: center; */
  color: ${(props) => props.theme.color2};
  @media screen and (min-width: 601px) {
  }
`;
export const NavProject = styled.div`
  display: flex;
  width:100%;
  flex-direction: row;
  position: relative;
  background-image:url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2Ffond2.png?alt=media&token=fa6bbf8e-fa9a-49e2-85d4-4861fdec223d');
  align-items: center;
  /* margin: .8rem 0; */
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;
export const ProjectLinksContainer = styled.div`
    justify-content: center;
    width: 100%;
    height: 3rem;;
    
`;
export const LinksWrapper = styled.ul`
 /* position: relative; */
  box-shadow: 2px #222;
  margin: 0 auto;
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
  font-family: ${props => props.theme.textFont};
  color: ${props => props.theme.color4};
  font-weight: 600;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  transition: all 220ms ease-in-out;
  text-decoration: none;
  padding: 0 0.5rem;
  height:100%;
  cursor:pointer;

  &:hover {
    transition: all, 240ms ease-in-out;
    border-bottom: 3px solid ${props => props.theme.color1};
    color: ${props => props.theme.color1};
  }
  &.active {
    border-bottom: 2px solid ${props => props.theme.color1};
  }
`;

export const CardsContainer = styled.div`
 display: flex;
  flex-direction: column;
  width:45%;
  margin: .5rem;
  margin-bottom:1em;
  /* height:100%; */
  /* box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  &[class~="cout"] {
    width:98%;
    margin-bottom: .5rem;
  }
  @media screen and (min-width:601px) { 
    width:20%;
  }
`;
export const CardContainer = styled.div`
display: flex;
flex-direction: column;
height:30vh;
background-color: ${(props) => props.theme.color4};
@media screen and (min-width:601px) { 
  width:100%;
}
`;

export const ModifyDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: .5rem;
  @media screen and (min-width: 601px) {
    margin-top: 1em;
  }
`;
export const TrashContainer = styled.div`
  height: 23px;
  width: 23px;
  @media screen and (min-width: 601px) {
    right: 2rem;
  }
`;

export const TrashButton = styled(Trash)`
  cursor: pointer;
  color: red;
  object-fit: fill;
`;

export const ModifyContainer = styled.div`
  width: 19px;
  height: 19px;
  margin-right: 0.9em;
  @media screen and (min-width: 601px) {
    right: 4rem;
  }
`;

export const ModifyButton = styled(PencilFill)`
  cursor: pointer;
  color: ${(props) => props.theme.color2};
  width:100%;
`;


export const Section = styled.section`
   height: 90vh;
  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-self: flex-start;
    justify-content: space-evenly;
    width:98%;
    margin:0.2rem;
    /* &[class~="tissus"] {
    margin-top: 1rem;
  } */
  background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2FhaberdasheryBackground.png?alt=media&token=9d1ba8b8-95cb-4df3-a8c0-455da440d7df');
  &[class~="mercerie"] {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2FpatternsBackground.png?alt=media&token=050d4fb1-9a09-4f3a-adc0-f2237f3d62bc');
  }
  &[class~="patron"] {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2FhaberdasheryBackground2.png?alt=media&token=43265e04-592d-4b90-81bb-6053557c8868');
  }
  &[class~="cout"] {
    margin-bottom: 3rem;
  }
    @media screen and (min-width:601px) { 
      height:100%;

    }
  `;
export const SectionTitle = styled.h2`
font : 1.2rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color4};
   text-align: center; 
  width:100%;
  font-weight:600;
  /* margin-top: 1rem; */
  padding: .7rem;
  

  
`;
export const ImgContainer = styled.div`
  height:60%;
  &[class~="patron"] {
    height: 50%;
  }
  &[class~="notes"] {
    height: 50%;
  }
`;

export const CardImg = styled.img`
  background-color: ${props => props.theme.color2};
  object-fit: cover;
  width:100%;
  height:100%;
`;

export const CardText = styled.h3`
  text-align: center;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.color4};
  height: 8rem;
  width:100%;
  padding: 0 .3rem;
  font : 0.9rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color5};
  border-bottom: 2px solid ${props => props.theme.color2} ;

  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
`;

export const CardParagraph = styled.p`
  text-align: center;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.color4};
  height: 8rem;
  width:100%;
  padding: 0 .3rem;
  font : 0.9rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color5};
  border-bottom: 2px solid ${props => props.theme.color2} ;
  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
`;

export const CostTab = styled.table`
  display: flex;
  flex-direction: column;
`;
export const CostTabRow = styled.tr`
display: flex;
  flex-direction: row;
  border: 1px solid ${props => props.theme.color4};
 background-color: ${props => props.theme.color2};

 &[class~="info"] {
  padding: 0.3rem 0;
  align-items: center;
  }
`;

export const CostTabHeadCell = styled.th`
display: flex;
  flex-direction: row;
  justify-content: center;
  width:20%;
  
  background-color: ${props => props.theme.color3};
  font : 1rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color4};
  font-weight: 600;
  padding: 0.3rem 0;
  &[class~="name"] {
    width: auto;
    flex-grow: 1;
  }
  /* &[class~="quantity"] {
    width: auto;
    flex-grow: 1;
  } */
`; 

export const CostTabCell = styled.td`
display: flex;
  flex-direction: row;
  
  justify-content: center;
  font : 0.9rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color4};
  width:20%;
  
  &[class~="name"] {
    width: auto;
    flex-grow: 1;

  }
  /* &[class~="quantity"] {
    width: auto;
    flex-grow: 1;
  } */
`;

export const CostPicture = styled.img`
  object-fit: cover;
  width:100%;
  height:100%;
  margin-left: .3rem;
`;