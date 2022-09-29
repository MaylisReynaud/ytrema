import styled from 'styled-components';
import { PencilFill } from "@styled-icons/bootstrap";
import { motion } from 'framer-motion';

export const Title = styled.h1`
    color: ${props => props.theme.color3};
    font-family: '${props => props.theme.titleFont}';
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70vh;
    overflow-y:scroll;
    margin: 0 1.3rem;
    @media screen and (min-width:601px) { 
        flex-direction: row;
        height:100%;   
        justify-content: space-between;
        align-items:flex-start;     
  }
`;
export const ProfileSection = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width:100%;
  @media screen and (min-width:601px) { 
      width: 40%;
      margin-left: 1.3rem;       
  }
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media screen and (min-width:601px) {
      justify-content: space-between;   
  }
`;

export const SubsectionTitle = styled.h2`
  font : bold 1.1rem '${props => props.theme.textFont}';
  color: ${props => props.theme.color3};
  align-items: center;
  margin: 1em 0;
  @media screen and (min-width:601px) { 
    font-size: 1.3rem;
    text-align: left;
  }
  `;

export const ModifyContainer = styled.div`
    width: 19px;
    height: 19px;

    @media screen and (min-width: 601px) {
        right: 4rem;
  }
`;

export const ModifyButton = styled(PencilFill)`
    display: flex;
    cursor: pointer;
    color: ${(props) => props.theme.color2};
    width:100%;
`;

export const ProfilePictureContainer = styled.div`
  display:flex;
  height: 8rem;
  width: 8rem;
  margin-top:1rem;
  border-radius: 65px;
  @media screen and (min-width: 601px) {
    align-self: center;
  }
`;

export const ProfilePicture = styled.img`
  /* object-fit:cover; */
  width: 100%;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const InformationSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  @media screen and (min-width: 601px) {
   width: 70%;
  }
`;

export const InformationSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1.2rem;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  margin : 0 1.3rem;
`;

export const InformationTitle = styled.span`
   display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  color: ${(props) => props.theme.color4};
  width: 30%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G5.png?alt=media&token=78f60b3f-9f20-492f-b255-9a524613731b');
  @media screen and (min-width: 601px) {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G10.png?alt=media&token=f322f2cd-7985-40a4-b9fb-ed75bc1c18fe');
    width: 30%;
    font-weight:600;
  }
`;

export const MemberInformation = styled.span`
  display: flex;
  align-items: center;
  width: 70%;
  flex-direction: row;
  resize: none;
  margin-left: 0.5rem;
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
  };

`;

export const InputPictureContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const InputPicture = styled.input` 
`;

export const MemberInformationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
`;

export const LabelForm = styled.label`
display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  color: ${(props) => props.theme.color4};
  width: 30%;
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G5.png?alt=media&token=78f60b3f-9f20-492f-b255-9a524613731b');
  @media screen and (min-width: 601px) {
    background-image: url('https://firebasestorage.googleapis.com/v0/b/ytrema-f6e59.appspot.com/o/brush%2Fbrush-G10.png?alt=media&token=f322f2cd-7985-40a4-b9fb-ed75bc1c18fe');
    font-weight:600;
  }
`;

export const InputForm = styled.input`
  display: flex;
  align-items: center;
  width: 70%;
  flex-direction: row;
  resize: none;
  margin-left: 0.5rem;
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
  };

  `;

export const UpdateInformationContainer = styled(motion.div)`
transition: all, 800ms ease-in-out;
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

export const ButtonForm = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12%;  
  padding: 1rem;
  background: ${(props) => props.theme.color1};
  font-family: "${(props) => props.theme.textFont}";
  color: ${(props) => props.theme.color4};
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.3rem;
  cursor: pointer;
  @media screen and (min-width: 601px) {
    width: 100%;
    margin-top: 2rem;
    padding: 1rem;
  }
`;

export const ArticleContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  @media screen and (min-width: 601px) {
    width: 100%;
    margin-top: 1rem;
    align-items: center;
    justify-content: space-between;
    
  }
  
`;

export const ArticleText = styled.p`
  font-family: "${(props) => props.theme.textFont}";
  font-size: 1rem;
`;

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 12%;  
  padding: 1rem;
  background: red;
  font-family: "${(props) => props.theme.textFont}";
  color: ${(props) => props.theme.color4};
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  @media screen and (min-width: 601px) {
    width: 30%;
    
  }
`;

