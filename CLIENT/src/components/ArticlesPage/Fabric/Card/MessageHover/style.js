import styled from "styled-components";
import { InfoCircleFill } from '@styled-icons/bootstrap'


export const MessageHoverContainer = styled.div`
 position: relative;
  @media screen and (min-width: 601px) {
  }
`;

export const MessageHoverIcon = styled(InfoCircleFill)`
 width: 15px;
 color:${(props) => props.theme.color1};
  @media screen and (min-width: 601px) {
  }
  `;

export const MessageHoverText = styled.p`
 position: absolute;
 padding: .7em;
 top: -2em;
 width: 11em;
 left: -11em;
 font-family: "${(props) => props.theme.textFont}";
font-size: .9rem;
 border: 1px solid ${(props) => props.theme.color1};
 background-color: ${(props) => props.theme.color1};
  @media screen and (min-width: 601px) {
  }
`;



// export const MessageHoverIcon = styled.button`
//  width: 10%;
//  display:flex;
//  color:${(props) => props.theme.color1};
//   @media screen and (min-width: 601px) {
//   }
// `;