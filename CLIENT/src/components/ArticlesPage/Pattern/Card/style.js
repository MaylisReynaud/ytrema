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
    height: 94vh;
  }
`;

export const UpdatePhotoInput = styled.div`
  height: 15rem;
  margin: 0 1em 1em 1em;
  @media screen and (min-width: 601px) {
    display:flex;
    flex-direction:column;
    height: 80%;
    width: 100%;
  }
`;

export const UpdateCardContainer = styled.div`
  display: contents;
  @media screen and (min-width: 601px) {
    display:flex;
    flex-direction:column;
    height:80%;
    width: 70%;
  }
`;
export const UpdateFileInputContainer = styled.div`
  margin-left: 1em;
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
  /* color: red; */
  @media screen and (min-width: 601px) {
    /* left: 1.5rem; */
  }
`;

export const ModifyDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
  @media screen and (min-width: 601px) {
    margin-top: 0em;
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
  /* justify-content:  center; */
  /* align-items: center; */
  /* height: auto; */
  width: 90%;
  margin: 3rem 0rem 1rem 0rem;
  /* background-color: blue; */

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
  /* background-color: #83433e; */

  /* @media screen and (min-width:601px) { 
        flex-direction: row;
        position: fixed;
        height: 100vh;
        background-color: salmon;
        
  } */
`;

export const DesignerTitle = styled.h1`
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
    height: 90%;
    margin-left: 1.3em;
    margin-bottom: 5em;
  }
`;
export const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 2em;
  @media screen and (min-width: 601px) {
    height: 90%;
    margin-left: 1.3em;
    margin-bottom: 5em;
  }
`;
export const ImageCard = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;

  /* @media screen and (min-width:601px) { 
        flex-direction: row;
        position: fixed;
        height: 100vh;
        background-color: salmon;
        
  } */
`;
export const InformationContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-top: 1rem;

  @media screen and (min-width: 601px) {
    height: 100%;
  }
`;

export const InformationForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  height: 90%;
  overflow-y: scroll;
  @media screen and (min-width: 601px) {
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 1rem 0rem;
    height: 100%;
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
`;

export const InformationLabel = styled.label`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0rem;
  color: ${(props) => props.theme.color3};
  width: 30%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
`;

export const InformationInput = styled.input`
  display: flex;
  width: 70%;
  flex-direction: row;
  margin-left: 0.5rem;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  border: none;
  background-color: #fff;
  /* border-bottom: 1px solid ${(props) => props.theme.color1} ; */
  font-weight: bold;
  &[class~="input-false"] {
    border: 1px solid red;
    background-color: #ffe0d3;
  }
  ::placeholder {
    color: black;
    flex-wrap: wrap;
    background-color:red;
  }
`;

export const InformationLinkContainer = styled.div`
  margin-left: 0.5rem;
`;

export const InformationLink = styled.a`
  color: blue;
`;

export const InformationSelect = styled.select`
  /* display: flex; */
  display: inline-block;
  width: 70%;
  flex-direction: row;
  margin-left: 0.5rem;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  border: none;
  background-color: #fff;
  /* border-bottom: 1px solid ${(props) => props.theme.color1} ; */
  font-weight: bold;
  :hover {
    color: ${(props) => props.theme.color3};
  }
  :focus {
    border: 2px solid ${(props) => props.theme.color3};
  }
  ::placeholder {
    color: grey;
  }
`;

export const ButtonForm = styled.button`
  width: 100%;
  height: 45px;
  padding: 10px;
  background: ${(props) => props.theme.color1};
  font-family: "${(props) => props.theme.textFont}";
  color: ${(props) => props.theme.color4};
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.3rem;
  cursor: pointer;
  margin: 10px 0px;
  @media screen and (min-width: 601px) {
    width: 100%;
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
  justify-content: space-around;
  width: 100%;
  height: 7rem;
`;
export const ProjectImage = styled.img`
  object-fit: cover;
  width: 6rem;
  height: 6rem;
`;
