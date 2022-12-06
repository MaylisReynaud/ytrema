import styled from 'styled-components';
import { PatchPlusFill } from "@styled-icons/bootstrap"
import { PatchMinusFill } from '@styled-icons/bootstrap'
import { MinusSm } from '@styled-icons/heroicons-solid';
import { PlusSm } from '@styled-icons/heroicons-solid';
import { ArrowLeftCircleFill } from '@styled-icons/bootstrap';
import { Close } from '@styled-icons/evaicons-solid';

export const AddProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
  display: none;}
  overflow-y: scroll;
  height:100vh;
  width:100%;
  margin-bottom:3em;
   
`;
export const CloseButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
margin: .5rem 1.1rem 0 0;
width:100%;
`;

export const CloseButton = styled(Close)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    width: 32px;
    height: 32px;
    
`;
export const FormContainer = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    margin: 0 1.3rem;
    font-family:'${props => props.theme.textFont}';
    &[class~="addArticle"] {
    overflow-y: scroll;
  }
    @media screen and (min-width:601px) { 
        /* width: 90%;
        height:100%; */
  }
`;

export const Form = styled.form`
    display: flex;
    flex-direction:column;

    font-family:'${props => props.theme.textFont}';
   
    overflow-y: scroll;
    &[class~="addNote"] {
    height:100%;
  }
    @media screen and (min-width:601px) { 
        width: 90%;
        height:100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: .7rem;
`;

export const Title = styled.h1`
    color: ${props => props.theme.color3};
    font-family: '${props => props.theme.titleFont}';
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
`;

export const LabelInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
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
  &[class~="update"] {
    width: 25%;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G10.png?alt=media&token=f322f2cd-7985-40a4-b9fb-ed75bc1c18fe');
  }
  @media screen and (min-width: 601px) {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G10.png?alt=media&token=f322f2cd-7985-40a4-b9fb-ed75bc1c18fe');
    width: 20%;
    font-weight:600;
  }
`;

export const InformationInput = styled.input`
  display: flex;
  align-items: center;
  width: 70%;
  flex-direction: row;
  resize: none;
  margin-left: 0.5rem;
  font-family: "${(props) => props.theme.textFont}";
  border: 1px solid ${(props) => props.theme.color2};
  font-size: 1rem;
  padding: 0.8rem;
  color:  ${(props) => props.theme.color4};

  background-image:url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2Ffond2.png?alt=media&token=fa6bbf8e-fa9a-49e2-85d4-4861fdec223d');
  background-color:  ${(props) => props.theme.color2};
  :focus {
    border: 2px solid ${(props) => props.theme.color1};
  }
  ::placeholder {
    color: black;
  }
  
  &[class~="input-false"] {
    border: 1px solid red;
    background-color: #ffe0d3;
  }
  &[class~="update"] {
    
    width: 57%;
    ::placeholder {
      color:  ${(props) => props.theme.color4};
  }
  }
`;

export const InformationSelect = styled.select`
  display: inline-block;
  width: 70%;
  flex-direction: row;
  margin-left: 0.5rem;
  color:  ${(props) => props.theme.color4};
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.color2};
  padding: 0.2rem;
  background-image:url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2Ffond2.png?alt=media&token=fa6bbf8e-fa9a-49e2-85d4-4861fdec223d');
  background-color:  ${(props) => props.theme.color2};
  :hover {
    color: ${(props) => props.theme.color4};
  }
  :focus {
    border: 2px solid ${(props) => props.theme.color1};
  }
  ::placeholder {
    color: grey;
  }
  &[class~="update"] {
    width: 57%;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TitleSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleSection = styled.h2`
    color: ${props => props.theme.color3};
    font-family: "${(props) => props.theme.textFont}";
    font-size: 1.5rem;
    font-weight:bold;
    margin: 1rem 0;
    text-align: center;

`;

export const MinusIcon = styled(MinusSm)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    width: 30px;
    height: 30px;
    padding: 0;
    z-index: 100;
`;

export const PlusIcon = styled(PlusSm)`
    cursor: pointer;
    color: ${props => props.theme.color5};
    width: 30px;
    height: 30px;
    padding: 0;
    z-index: 100;
`;

export const AddOneArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:.5rem;
  &[class~="articleUpdate"] {
    align-items:center;
  }
`;

export const Text = styled.p`
  color: ${props => props.theme.color4};
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  background-image:url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2Ffond2.png?alt=media&token=fa6bbf8e-fa9a-49e2-85d4-4861fdec223d');
  &[class~="haberdashery"] {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/projet%2FhaberdasheryBackground2.png?alt=media&token=43265e04-592d-4b90-81bb-6053557c8868');
  }
  &[class~="articleUpdate"] {
    width: 89%;
  }
`;

export const PreviewButtonContainer = styled.div`
  position: relative;
  display: block;
  &[class~="firstShow"] {
    padding-bottom: 3rem;
  }

`;

export const Preview = styled.img`
  display: block;  
  box-sizing: border-box;
  margin-top: 1rem;
  width: 69vw;
  height: 25vh;
  object-fit:cover;
  border: .5rem solid ${(props) => props.theme.color4};
  background-color:  ${(props) => props.theme.color4};
  &[class~="project"] {
    height: 20vh;
  }
`;

export const RemoveButton = styled(PatchMinusFill)`
  display: flex;
  position:absolute;
  bottom: -12%;
  right: -9%;
  cursor: pointer;
  color: #ff515d;
  width:17%;
`;
export const AddReturnButtonContainer = styled.div`
  display: block;
  /* position: relative; */
  background-color: red;
`;

export const AddButton = styled(PatchPlusFill)`
  display: flex;
  position:absolute;
  bottom: -8%;
  right: -10%;
  cursor: pointer;
  width:18%;
  color: ${(props) => props.theme.color1};
  &[class~="Alone"] {
    bottom: 8%;
    right: -10%;
  }
  &[class~="AddOneMoreSection"] {
    bottom: 8%;
    right: -10%;
  }
`;

export const ReturnButton = styled(ArrowLeftCircleFill)`
  display: flex;
  position:absolute;
  bottom: -12%;
  right: -9%;
  cursor: pointer;
  color: ${(props) => props.theme.color1};
  width:15%;
  &[class~="AddOneMoreSection"] {
    bottom: 9%;
    left: -8%;
  }
`;

export const AllFabricsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  &[class~="addArticle"] {
    width:98%;
  }
`;

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-evenly;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
    display: none;}
    overflow-y: scroll;
    height:auto;
    width:100%;
    margin-bottom:1.5em;
    &[class~="AddArticle"] {
      width:90%;
  }
   
    @media screen and (min-width:601px) { 
      height:100%;

    }
  `;

export const CardsMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width:45%; 
  margin: .6rem 0;
  /* box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media screen and (min-width:601px) { 
    width:20%;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:12rem;
  cursor: pointer;
  @media screen and (min-width:601px) { 
    width:100%;
  }
`;

export const ImgContainer = styled.div`
  height:50%;
`;

export const CardImg = styled.img`
  background-color: ${props => props.theme.color1};
  object-fit: cover;
  width:100%;
  height:100%;

`

export const CardText = styled.h3`
  text-align: center;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.color4};
  height: 8rem;
  width:100%;
  padding: 0 .3rem;
  font : 0.9rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color5};
  border-bottom: 2px solid ${props => props.theme.color1};
  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
`;

export const SelectedArticleInfo = styled.h3`
  text-align: center;
  display: flex;
  align-items: center;
  margin: 2rem 1.5rem 0 1.5rem;
  font : 600 1rem '${props => props.theme.textFont}';
  color: ${props => props.theme.color4};
  &[class~="pattern"] {
    margin-bottom: 1.5rem;
  }
  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.6rem;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
`;

export const QuantityLabel = styled.label`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  color: ${(props) => props.theme.color4};
  width: 30%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  
  @media screen and (min-width: 601px) {
    width: 20%;
    font-weight:600;
  }
`;

export const QuantityInput = styled.input`
  display: flex;
  align-items: center;
  width: 50%;
  flex-direction: row;
  margin-left: 0.5rem;
  font-family: "${(props) => props.theme.textFont}";
  border: 1px solid ${(props) => props.theme.color2};
  font-size: 1rem;
  color:  ${(props) => props.theme.color5};
  background-color:  ${(props) => props.theme.color4};
  padding-left:.5rem;
  ::placeholder {
    color: black;
    font-size: 0.7rem;
  }
  &[class~="input-false"] {
    border: 1px solid red;
    background-color: #ffe0d3;
  }
`;

export const AddOneMoreButton = styled.button`
  width: 90%;
  height: 15%;
  padding: .5rem;
  background: ${(props) => props.theme.color1};
  font-family: "${(props) => props.theme.textFont}";
  color: ${(props) => props.theme.color4};
  border: none;
  margin-top: 1rem;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: 601px) {
    width: 94%;
    margin-top: 2rem;
    padding: 1rem;
  }
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

export const PictureInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
`;

export const PictureInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  width: 79%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  color: ${props => props.theme.color4};
`;