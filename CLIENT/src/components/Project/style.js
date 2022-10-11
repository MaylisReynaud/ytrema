import styled from 'styled-components';
import { PatchPlusFill } from "@styled-icons/bootstrap"
import { PatchMinusFill } from '@styled-icons/bootstrap'


export const AddProjectContainer = styled.div`
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
  height:100vh;
  width:100%;
  margin-bottom:3em;
   
`;
export const FormContainer = styled.div`
    display: flex;
    flex-direction:column;
    font-family:'${props => props.theme.textFont}';
    @media screen and (min-width:601px) { 
        width: 90%;
        height:100%;
  }
`;

export const Form = styled.form`
    display: flex;
    flex-direction:column;
    font-family:'${props => props.theme.textFont}';
    margin: 0 1.3rem;
    overflow-y: scroll;
    @media screen and (min-width:601px) { 
        width: 90%;
        height:100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
  /* &[class~="disabled"] {
    ::placeholder {
    color: grey;
  } */
  /* } */
  &[class~="input-false"] {
    border: 1px solid red;
    background-color: #ffe0d3;
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
`;

export const FabricSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TitleSectionContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const TitleSection = styled.h2`
    color: ${props => props.theme.color3};
    font-family: "${(props) => props.theme.textFont}";
    font-size: 1.5rem;
    font-weight:bold;
    margin: 1rem 0;
    text-align: center;
`;

export const AddOneFabricContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:.5rem;
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
`;

export const Preview = styled.img`
  display: flex;  
  margin: 1rem 1rem 0 1rem;
  width: 69vw;
  height: 25vh;
  object-fit:cover;
  border: .5rem solid ${(props) => props.theme.color4};
  background-color:  ${(props) => props.theme.color4};
`;

export const AddButton = styled(PatchPlusFill)`
    display: flex;
    position:relative;
    top:-1.5rem;
    left:7.7rem;
    cursor: pointer;
    color: ${(props) => props.theme.color1};
    width:17%;
`;

export const RemoveButton = styled(PatchMinusFill)`
  display: flex;
  position:relative;
  top:-1.5rem;
  left:7.7rem;
  cursor: pointer;
  color: #ff515d;
  width:17%;
`;


export const AllFabricsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
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

export const SelectedFabricInfo = styled.h3`
  text-align: center;
  display: flex;
  align-items: center;
  margin-top:1.2rem;
  font : 600 1rem/1.5 '${props => props.theme.textFont}';
  color: ${props => props.theme.color4};
  @media screen and (min-width:601px) { 
    justify-content:center;
    text-align: center;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.2rem;
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