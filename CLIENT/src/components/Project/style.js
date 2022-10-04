import styled from 'styled-components';
import { PatchPlusFill } from "@styled-icons/bootstrap"

export const AddButton = styled(PatchPlusFill)`
    display: flex;
    cursor: pointer;
    color: ${(props) => props.theme.color1};
    width:20%;
`;

export const CardsMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:45%;
  margin: .5rem;
  /* box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (min-width:601px) { 
    width:20%;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:12rem;
  cursor: pointer;
  @media screen and (min-width:601px) { 
    width:100%;
  }
`;

export const ImgContainer = styled.div`
  height:50%;
`;

export const CardImg = styled.img`
  background-color: ${props => props.theme.color1};
  object-fit: cover;
  width:100%;
  height:100%;
`

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
  border-bottom: 2px solid ${props => props.theme.color1};
  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
`;
