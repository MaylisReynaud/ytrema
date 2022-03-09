import styled from 'styled-components';

export const InputContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    width: 300px;
`;

export const LabelForm = styled.label`
    font-size: '${props => props.theme.textFont}';
    color: ${props => props.theme.color3};
`;
export const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    padding: 3px;
    display: none;
`;

export const InputForm = styled.input`
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    border:none;

    &:invalid[focused="true"]{
    border: 1px solid red;
    }
    &:invalid[focused="true"] ~ ${ErrorMessage} {
    display: block;
    }
`;



    /* &input:invalid[focused='true'] ~ span {
        display: block
    } */



