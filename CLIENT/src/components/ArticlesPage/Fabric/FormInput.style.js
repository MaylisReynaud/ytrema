import styled, {css} from 'styled-components';

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
    
    /* &input:invalid[focused='true'] ~ span{
    display: block;
} */
`;

export const ErrorMessage = styled.span`
    font-size: 0.8rem;
    padding: 2px;
    color: red;
    display: none
`;


