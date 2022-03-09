import styled from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    flex-direction:column;
    font-family:'${props => props.theme.textFont}';
    overflow:hidden;
    height:77vh
`;
export const FabricImage = styled.img`
    height: 80%;
`;
export const InputContainer = styled.div`
    display: flex;
    align-items: center;    
    height: 80%;
    font-family:'${props => props.theme.textFont}';
    overflow-y:scroll;
    flex-direction: column;
`;

export const FabricPicture = styled.img`
    height: 60px;
    display:flex;
    justify-content:center;
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