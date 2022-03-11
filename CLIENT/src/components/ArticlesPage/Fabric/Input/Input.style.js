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
    text-align: left;
`;
export const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    padding: 3px;
    /* display: none; */
`;

export const InputForm = styled.input`
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    border:1px solid grey;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button{
        opacity:1
    }    
    :focus{
        border: 1px solid yellow;
    }

    /* &:invalid{
    border: 1px solid red;
    } */
    /* &:invalid ~ ${ErrorMessage} {
    display: block;
    } */
    /* font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px; */
  ::placeholder {
    color: grey;
  }
`;

export const SelectForm = styled.select`
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    border:1px solid grey;

    /* &:invalid{
    border: 1px solid red;
    } */

`;

    /* &input:invalid[focused='true'] ~ span {
        display: block
    } */



