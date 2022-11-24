import styled from 'styled-components';


export const CheckboxesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    overflow-y: scroll;
    
    @media screen and (max-width:600px) {
        overflow-y: scroll;
        scroll-behavior:smooth;
        height: 60px;
        margin-bottom: 1rem;

        
    }

`;

export const CheckboxLabel = styled.label`
 display: flex;
 &:last-child {
            margin-bottom: 1rem;
        }
 
`;
export const SpanLabel = styled.span`
    margin-left: 0.8rem;
    font-family: ${props => props.theme.textFont};
    font-size: 1rem;
`;