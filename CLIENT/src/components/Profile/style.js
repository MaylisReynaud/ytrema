import styled from 'styled-components';
import { PencilFill } from "@styled-icons/bootstrap";

export const Title = styled.h1`
    color: ${props => props.theme.color3};
    font-family: '${props => props.theme.titleFont}';
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
    overflow-y:hidden;
    background-color: red;
    margin: 0 1.3rem;
    @media screen and (min-width:601px) { 
        flex-direction: row;
        margin-bottom:3.5em;
        height:100%;        
  }
`;

export const Subsection  = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 8%;
    width:100%;
    overflow-y:hidden;
    background-color: pink;
    @media screen and (min-width:601px) { 
       
  }
`;

export const SubsectionTitle = styled.h2`
  font : bold 1.1rem '${props => props.theme.textFont}';
  color: ${props => props.theme.color3};
  align-items: center;

  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
  `;

export const ModifyContainer = styled.div`
    width: 19px;
    height: 19px;

    @media screen and (min-width: 601px) {
        right: 4rem;
  }
`;

export const ModifyButton = styled(PencilFill)`
    display: flex;
    cursor: pointer;
    color: ${(props) => props.theme.color2};
    width:100%;
`;