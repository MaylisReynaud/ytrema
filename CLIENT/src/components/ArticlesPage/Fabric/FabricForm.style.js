import styled from 'styled-components';

export const FormContainer = styled.form`
    /* overflow: scroll;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center; */
    font-family:'${props => props.theme.textFont}';
`;
export const ButtonForm = styled.button`
    width:100%;
    height:30px;
    padding: 10px;
    background: ${props => props.theme.color1};
    font-family: '${props => props.theme.textFont}';
    color: ${props => props.theme.color4};
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;
    margin: 5px 0px;
`;