import styled from 'styled-components';
import { ArrowSmLeft } from '@styled-icons/heroicons-outline';
import { Close } from '@styled-icons/evaicons-solid';
import { PencilFill } from '@styled-icons/bootstrap';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 86vh;
    width:100%;
    overflow-y: scroll;
   
    @media screen and (min-width:601px) { 
        height: 100vh;
  }
`;
export const ReturnArrow = styled(ArrowSmLeft)`
   cursor: pointer;
    position: absolute;
    top: 68px;
    left: 2px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
    color: ${props => props.theme.color3};
    /* color: red; */


   
    @media screen and (min-width:601px) { 
        left: 1.5rem;
        
  }
`;
export const CloseButton = styled(Close)`
    cursor: pointer;
    position: absolute;
    top: 68px;
    right: 2px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
    color: red;
    @media screen and (min-width:601px) { 
        right:2rem;
  }
`;
export const ModifyButton = styled(PencilFill)`
    cursor: pointer;
    color: ${props => props.theme.color2};
    position: absolute;
    top: 74px;
    right: 41px;
    width: 18px;
    height: 19px;
    padding: 0;
    z-index: 10;
    @media screen and (min-width:601px) { 
        right:4rem;
  }
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height:84vh;
    width:100%;
   
    @media screen and (min-width:601px) { 
        flex-direction: row;
        height: 90vh;
        
  }
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 3rem;
    width:100%;
    margin-top: 2rem;
    /* background-color: blue; */
   
    @media screen and (min-width:601px) { 
        margin: 1rem 0rem;
        
  }
`;
export const CardTitle = styled.h1`
    display: flex;
    flex-direction: column;
    width:100%;
    text-align: center;
    justify-content: center;
    align-items: center;
    font : 1.4rem/2.5 '${props => props.theme.textFont}';
    font-weight: bold;
    color: ${props => props.theme.color2};
    /* background-color: #83433e; */
   
    /* @media screen and (min-width:601px) { 
        flex-direction: row;
        position: fixed;
        height: 100vh;
        background-color: salmon;
        
  } */
`;
export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width:90%;
    height: 15rem;
    margin-top: 1rem;
   
    @media screen and (min-width:601px) { 
        height: 100%;
        
  }
`;
export const ImageCard = styled.img`
    object-fit: cover;
    width:100%;
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
    width:100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-top: 1rem;
   
    @media screen and (min-width:601px) { 
        height:100%;
        
  }
`;

export const InformationForm = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    height: 90%;
    overflow-y: scroll;

   
   
    @media screen and (min-width:601px) { 
        flex-direction: column;

        margin: 1rem 0rem;
        height:100%;       
  }
`;

export const InformationContent = styled.div`
    display: flex;
    margin-top: 1.2rem;
`;

export const InformationLabel = styled.label`
   display: flex;
   flex-direction: row;

   margin: 0.5rem 0rem;
   font-family: '${props => props.theme.textFont}';
   font-size: 1rem;
   color: ${props => props.theme.color3};
   font-weight: bold;
   
`;
export const InformationInput = styled.input`
    display: flex;
    align-content: stretch;
    flex-direction: row;
    margin-left: 0.5rem;
    font-family: '${props => props.theme.textFont}';
    border: none;
    border-bottom: 1px solid ${props => props.theme.color1} ;
`;

export const ProjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10rem;   
   
`;
export const ProjectTitle = styled.h2`
    display: flex;
    width:100%;
    text-align: center;
    justify-content: center;
    align-items: flex-start;
    font : 1.3rem/2.5 '${props => props.theme.textFont}';
    font-weight: bold;
    color: ${props => props.theme.color2};

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