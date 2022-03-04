import styled from 'styled-components';

export const FabricForm = styled.div`

`;

export const LabelForm = styled.label`
    font-size: '${props => props.theme.textFont}';
`;

export const InputForm = styled.input`
    display: flex;
    flex-direction: column;
    padding: 5px;
    width: 280px;
    border-radius: 5px;
`;

export const ErrorMessage = styled.span`

`;

