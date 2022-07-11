import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    @media screen and (min-width:601px) { 
        width: 100%;
        height: 100%;
  }
`;

export const LabelForm = styled.label`
    font-size: "${(props) => props.theme.textFont}";
    color: ${(props) => props.theme.color3};
    text-align: left;
`;
export const ErrorMessage = styled.span`
    width: 80%;
    padding: 10px;
    color: red;
    font-size: 13px;
    line-height: 1.2;
  /* display: none; */
`;

export const InputForm = styled.input`
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    border: 1px solid grey;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
        opacity: 1;
  }
    :focus {
        border: 2px solid ${(props) => props.theme.color3};
  }
  &[class~="input-false"] {
        border: 1px solid red;
        background-color: #ffe0d3;
  }
    ::placeholder {
        color: grey;
    }
`;

export const SelectForm = styled.select`
    display: inline-block;
    outline: none;
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    border: 1px solid grey;
    :hover{
        color: ${(props) => props.theme.color3};
    }
    :focus {
        border: 2px solid ${(props) => props.theme.color3};
    }
    ::placeholder {
            color: grey;
        }
`;

