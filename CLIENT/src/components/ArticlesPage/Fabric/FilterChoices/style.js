import styled from 'styled-components';


export const CheckboxesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;

export const CheckboxLabel = styled.label`

`;
export const SpanLabel = styled.span`
    margin-left: 0.8rem;
    font-family: ${props => props.theme.textFont};
    font-size: 1rem;
`;