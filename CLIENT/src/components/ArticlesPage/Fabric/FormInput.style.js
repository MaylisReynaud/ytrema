import styled from 'styled-components';

export const InputContainer = styled.div`
    display: flex;
    flex-direction:column;
    width: 300px;
`;

export const LabelForm = styled.label`
    font-size: '${props => props.theme.textFont}';
`;

export const InputForm = styled.input`
    /* display: flex;
    flex-direction: column; */
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    border:none;
`;



