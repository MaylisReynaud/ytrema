import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.div`
    display: flex;
    /* position: fixed ; */
    /* justify-content:space-between; */
    /* bottom:0;
    left:0; */
    width: 100%;
    height: 8%;
    background-color: ${props => props.theme.color2};
    color: ${props => props.theme.color4};
`;

export const LinksWrapper = styled.ul`
  /* position: relative; */
  display: flex;
  justify-content: space-evenly;
  box-shadow: 2px #222;
  margin: 0 auto;
  padding: 1rem;
  height: 100%;
  width: 90%;
  list-style: none;
  align-items: center;
 
 
`;



export const LinkItem = styled.li`
  height: 30px;
  display: flex;
  justify-content: space-evenly;
  color: ${props => props.theme.color4};
  font-family: ${props => props.theme.textFont};
  font-size: 1em;
  /* transition: box-shadow 0.3s ease-in-out; */
  /* padding: 0.1em 0.4em; */
  /* transition: all 220ms ease-in-out; */
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;

   
    &:hover{
      font-weight:700;
      color: ${props => props.theme.color1};
      text-shadow: 1px 1px 0px ${props => props.theme.color1};
      letter-spacing: 2px;
    }
`;

export const SpanItem = styled.span`
  font-weight: 100;
  transition: all .1s;
  &:nth-child(2){
      transition-delay: .05s;
    }
    &:nth-child(3){
      transition-delay: .1s;
    }
    &:nth-child(4){
      transition-delay: .15s;
    }
    &:nth-child(5){
      transition-delay: .20s;
    }
    &:nth-child(6){
      transition-delay: .25s;
    }
    &:nth-child(7){
      transition-delay: .30s;
    }
    &:nth-child(8){
      transition-delay: .45s;
    }
    &:nth-child(9){
      transition-delay: .5s;
    }
    &:nth-child(10){
      transition-delay: .55s;
    }
    &:nth-child(11){
      transition-delay: .6s;
    }
    &:nth-child(12){
      transition-delay: .65s;
    }
    &:nth-child(13){
      transition-delay: .7s;
    }
    &:nth-child(14){
      transition-delay: .75s;
    }
    &:nth-child(15){
      transition-delay: .8s;
    }
    &:nth-child(16){
      transition-delay: .85s;
    }
    &:hover{
      &:nth-child(16){
      transition-delay: .75s;
      }
      &:nth-child(15){
        transition-delay: .7s;
      }
      &:nth-child(14){
        transition-delay: .65s;
      }
      &:nth-child(13){
        transition-delay: .6s;
      }
      &:nth-child(12){
        transition-delay: .55s;
      }
      &:nth-child(11){
        transition-delay: .5s;
      }
      &:nth-child(10){
        transition-delay: .45s;
      }
      &:nth-child(9){
        transition-delay: .4s;
      }
      &:nth-child(8){
        transition-delay: .35s;
      } 
      &:nth-child(7){
      transition-delay: .3s;
      }
      &:nth-child(6){
      transition-delay: .25s;
      }
      &:nth-child(5){
        transition-delay: .2s;
      }
      &:nth-child(4){
        transition-delay: .15s;
      }
      &:nth-child(3){
        transition-delay: .1s;
      }
      &:nth-child(2){
        transition-delay: .05s;
      }
      &:nth-child(1){
        transition-delay: 0s;
      }
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


