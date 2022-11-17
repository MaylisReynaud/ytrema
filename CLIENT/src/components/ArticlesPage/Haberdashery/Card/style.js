import styled from "styled-components";
import { motion } from 'framer-motion';
import { ArrowSmLeft } from "@styled-icons/heroicons-outline";
import { PencilFill } from "@styled-icons/bootstrap";
import { Trash } from "@styled-icons/boxicons-solid";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 86vh;
  width: 100%;
  overflow-y: scroll;
  margin-bottom: 0;

  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 86vh;
  margin-top: 0;
  width: 100%;
  @media screen and (min-width: 601px) {
    flex-direction: row;
    align-items: flex-start;
    height: 94vh;
  }
`;

export const UpdatePhotoInput = styled.div`
  height: 70%;
  margin: 0 1em 1em 1em;
  @media screen and (min-width: 601px) {
    display:flex;
    flex-direction:column;
    height:100%;
    width:100%;
    margin-left: 1.3em;
  }
`;

export const UpdateCardContainer = styled.div`
  display: contents;
  @media screen and (min-width: 601px) {
    margin-left: 1.3em;
    display:flex;
    flex-direction:column;
    height:91%;
    width: 75%;
  }
`;
export const UpdateFileInputContainer = styled.div`
  display: flex;
  margin-bottom: .6em;
  margin-top: 2em;
  justify-content: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  position: fixed;
  background-color: white;
  padding: 0.6em 0 1em 0;
  @media screen and (min-width: 601px) {
    flex-direction: row;
    position: sticky;
    height: auto;
  }
`;
export const UpdateInformationContainer = styled(motion.div)`
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
  @media screen and (min-width: 601px) {
  }
`;

export const UpdateInformationText = styled.h3`
  font: 1.1rem "${(props) => props.theme.textFont}";
  font-weight: bold;
  padding: .5em;
  color: ${(props) => props.theme.color4};
  background-color: ${(props) => props.theme.color1};
  @media screen and (min-width: 601px) {
  }
`;

export const ReturnArrowContainer = styled.div`
  display: flex;
  @media screen and (min-width: 601px) {
    margin-top: 1em;
  }
`;

export const ReturnArrow = styled(ArrowSmLeft)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-left: 0.8em;
  color: ${(props) => props.theme.color3};
  @media screen and (min-width: 601px) {
  }
`;

export const ModifyDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
  @media screen and (min-width: 601px) {
    margin-top: 1em;
  }
`;

export const TrashContainer = styled.div`
  height: 23px;
  width: 23px;
  @media screen and (min-width: 601px) {
    right: 2rem;
  }
`;

export const TrashButton = styled(Trash)`
  cursor: pointer;
  color: red;
  object-fit: fill;
`;

export const ModifyContainer = styled.div`
  width: 19px;
  height: 19px;
  margin-right: 0.9em;
  @media screen and (min-width: 601px) {
    right: 4rem;
  }
`;

export const ModifyButton = styled(PencilFill)`
  cursor: pointer;
  color: ${(props) => props.theme.color2};
  width:100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 3rem 0rem 1rem 0rem;
  @media screen and (min-width: 601px) {
    margin: 1rem 0rem;
  }
`;

export const CardTitle = styled.h1`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  font: 1.4rem "${(props) => props.theme.textFont}";
  font-weight: bold;
  color: ${(props) => props.theme.color2};
`;

export const SizeTitle = styled.h1`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  font: 1.4rem/2.5 "${(props) => props.theme.textFont}";
  font-weight: bold;
  color: ${(props) => props.theme.color2};
`;
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 15em;
  @media screen and (min-width: 601px) {
    height: 92%;
    margin-left: 1.3em;
  }
`;

export const ImageCard = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const InformationContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  @media screen and (min-width: 601px) {
    height: 100%;
    width: 60%;
    margin-left: 5.5rem;
  }
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
    margin: 1rem 0rem;
    height: 100%;
    width: 96%;
  }
  @media screen and (min-height: 800px) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const InformationContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  margin : 0 1.3rem;
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
  background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G11.png?alt=media&token=9ec1f31b-d909-4f56-9265-b8946269bc1a');
  @media screen and (min-width: 601px) {
    /* background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G-PC.png?alt=media&token=6d1a8231-f41b-4d76-af99-819b26423a86'); */
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
  margin-left: 0.5rem;
  resize: none;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  border: none;
  background-color: #fff;
  font-weight: bold;
  ::placeholder {
    color: black;
  }
  &[class~="disabled"] {
    ::placeholder {
    color: grey;
  }
  }
  &[class~="input-false"] {
    border: 1px solid red;
    background-color: #ffe0d3;
  }
  
`;

export const InformationTextarea = styled.textarea`
  display: flex;
  align-items: center;
  width: 70%;
  flex-direction: row;
  margin-left: 0.5rem;
  resize: none;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  border: none;
  background-color: #fff;
  font-weight: bold;
  ::placeholder {
    color: black;
  }
  &[class~="disabled"] {
    ::placeholder {
    color: grey;
  }
  }
  &[class~="input-false"] {
    border: 1px solid red;
    background-color: #ffe0d3;
  }
  
`;

export const InformationLinkContainer = styled.div`
  margin-left: 0.7rem;
  width:70%;
`;

export const InformationLink = styled.a`
  color: blue;
`;

export const InformationSelect = styled.select`
  display: inline-block;
  width: 70%;
  flex-direction: row;
  margin-left: 0.5rem;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  border: none;
  background-color: #fff;
  font-weight: bold;
  :hover {
    color: ${(props) => props.theme.color3};
  }
  :focus {
    border: 2px solid ${(props) => props.theme.color3};
  }
  &[class~="disabled"] {
    ::placeholder {
    color: grey;
  }
}
`;

export const ButtonForm = styled.button`
  width: 90%;
  height: 10%;
  background: ${(props) => props.theme.color1};
  font-family: "${(props) => props.theme.textFont}";
  color: ${(props) => props.theme.color4};
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: 1rem;
  @media screen and (min-width: 601px) {
    width: 94%;
    margin-top: 2rem;
    padding: 1rem;
  }
`;

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  margin-bottom:1em;
  @media screen and (min-width: 601px) {
   margin-bottom:4.6em;
  }


`;
export const ProjectTitle = styled.h2`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: flex-start;
  font: 1.3rem/2.5 "${(props) => props.theme.textFont}";
  font-weight: bold;
  color: ${(props) => props.theme.color2};
`;

export const ProjectImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 7rem;
`;
export const ProjectImage = styled.img`
  object-fit: cover;
  width: 6rem;
  height: 6rem;
`;
