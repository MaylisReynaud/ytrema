
import styled, {css} from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    flex-direction:column;
    font-family:'${props => props.theme.textFont}';
    overflow:hidden;
    height:77vh;
    @media screen and (min-width:601px) { 
        width: 90%;
        height:100%;
  }
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;    
    height: 80%;
    font-family:'${props => props.theme.textFont}';
    overflow-y:scroll;
    flex-direction: column;
    @media screen and (min-width:601px) { 
        width: 90%;
        height: 93%;
  }
`;
export const DefaultArticlePictureStyle = css`
    height: 20%;
    display:flex;
    justify-content:center;
    border: none;
`;

export const DefaultArticlePicture = styled.img`
   ${DefaultArticlePictureStyle}
`;

export const ArticlePicture = styled.img`
    ${DefaultArticlePictureStyle};
    border: 2px solid ${props => props.theme.color4};
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
    @media screen and (min-width:601px) { 
        width: 70%;
        margin-left: 3.5rem;
  }
`;