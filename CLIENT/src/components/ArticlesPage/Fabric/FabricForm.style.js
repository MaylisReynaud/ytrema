import styled from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    flex-direction:column;
    font-family:'${props => props.theme.textFont}';
    overflow:hidden;
    height:77vh
`;

export const InputContainer = styled.div`
    height: 80%;
    font-family:'${props => props.theme.textFont}';
    overflow-y:scroll;
`;

export const ButtonForm = styled.button`
    width:100%;
    height:45px;
    padding: 10px;
    background: ${props => props.theme.color1};
    font-family: '${props => props.theme.textFont}';
    color: ${props => props.theme.color4};
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;
    margin: 10px 0px;
`;