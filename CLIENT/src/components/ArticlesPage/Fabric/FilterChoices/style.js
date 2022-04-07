import styled from 'styled-components';


export const CheckboxesContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    height: 60px;
    flex-direction: column;
    margin-left: 1rem;
    flex-grow:1;
    @media screen and (min-width:601px) {
        height: 150px;
        margin-bottom: 1rem;
        /* overflow-y: visible; */

        
    }

`;

export const CheckboxLabel = styled.label`
 display: flex;
 background-color: green;
 &:last-child {
     background-color: pink;
            margin-bottom: 1rem;
        }
 
`;
export const SpanLabel = styled.span`
    margin-left: 0.8rem;
    font-family: ${props => props.theme.textFont};
    font-size: 1rem;
`;