
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Close } from '@styled-icons/evaicons-solid';

export const Container = styled(motion.div)`
    width: 100%;
    min-height:850px;
    display:flex;
    flex-direction: column;
    position: absolute;
    top:0;
    left:0;
`;


export const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    position:fixed;
    justify-content:center;
    align-items:center;
    @media screen and (min-width:601px) { 
        height: 100%;
  }
`;

export const ModalWrapper = styled.div`
    position: relative;
    display: flex;
    z-index:100;
    width: 90%;
    height:40%;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    color: #000;
    background-color: ${props => props.theme.color4};     
    border-radius: 10px;
    &[class~="updateArticle"] {
    height: 60%;
  }
  &[class~="addArticle"] {
    height: 60%;
  }
    @media screen and (min-width:601px) { 
        height:27%;
        width: 35%;       
  }
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 1.2em;
    padding: 0;
    z-index: 10;
    line-height: 1.5;
    color: ${props => props.theme.color5};
    overflow: hidden;
    height:86%;
    &[class~="articleUpdate"] {
    height: 97%;
  }
  &[class~="addArticle"] {
    width: 90%;
    height:95%;
  }
`;
export const TextContainer = styled.div`
    display: flex;
    justify-content:space-around;
    font-family: '${props => props.theme.titleFont}';
    margin: 0 1.5em;
    font-weight: bold;
    color: ${props => props.theme.color3};
    font-size: 1.5em;
`;
export const UpdateTitle = styled.h1`
    font-family: '${props => props.theme.titleFont}';
    margin: 0 1.5em 0.5em;
    font-weight: bold;
    color: ${props => props.theme.color3};
    font-size: 1.5em;
    text-align:center;
    @media screen and (min-width:601px) { 
        text-align:center;
        margin: 0 1.5em 0;

  }
`;

export const InformationContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  @media screen and (min-width: 601px) {
    /* height: 92%; */
    width: 60%;
    margin-left: 2.5rem;
 
  }
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  margin : 0 1.3rem;
`;
export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0 1.5em 0.5em;
    height:4em;
    &[class~="addArticle"] {
        margin:unset;
        margin-top:1rem;
  }
`;
export const CancelContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 60%;
    margin-right: 1em;

`;
export const CancelButton = styled.p`
        color: grey;
        font-family: '${props => props.theme.textFont}';
        font-size: 1em;

`;
export const UpdateContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 60%;


`;
export const UpdateButton = styled.button`
   background-color: ${props => props.theme.color1};
        width: 100%;
        padding: 0.5em;
        cursor:pointer;
        border-radius: 0.5em;
        border: 1px solid ${props => props.theme.color1};
        margin-right: 2em;
        color: ${props => props.theme.color4};
        font-family: '${props => props.theme.textFont}';
        font-size: 1em;
        font-weight: 600;
`;
export const CloseModalButton = styled(Close)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    padding: 0;
    z-index: 10;
`;

export const InformationForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  @media screen and (min-width: 601px) {
    flex-direction: column;
    flex-wrap: nowrap;
    width: 96%;
    margin: 1rem 0rem;
    height: 58%;
    overflow-x: hidden;
  }

  @media screen and (min-height: 800px) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const InformationLabel = styled.label`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  color: ${(props) => props.theme.color4};
  width: 30%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G7.png?alt=media&token=fe02984f-e05b-4dc3-8184-3276784c56d0');
  @media screen and (min-width: 601px) {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G102png.png?alt=media&token=d6d4a8c5-8b67-4b4b-9ff0-fd7db286ade2');
    width: 25%;
    font-weight:600;
  }
`;

export const ProjectName = styled.textarea`
  display: flex;
  align-items: center;
  width: 70%;
  flex-direction: row;
  resize: none;
  margin-left: 0.5rem;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid  ${(props) => props.theme.color1};

  padding: 1.3rem;
  background-color: #fff;
  font-weight: bold;
  ::placeholder {
    color: black;
  }
  @media screen and (min-width: 601px) {
    width: 60%;
  }
`;