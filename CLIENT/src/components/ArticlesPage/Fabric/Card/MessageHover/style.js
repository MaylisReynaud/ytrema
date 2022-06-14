import styled from "styled-components";
import {InfoCircleFill} from '@styled-icons/bootstrap'
export const MessageHoverContainer = styled.div`
 display:flex;
 position: relative;
  @media screen and (min-width: 601px) {

  }
`;

export const MessageHoverText = styled.div`
 display:flex;
  @media screen and (min-width: 601px) {

  }
`;

export const MessageHoverIcon = styled(InfoCircleFill)`
 width: 10%;
 display:flex;
 color:${(props) => props.theme.color1};
  @media screen and (min-width: 601px) {

  }
`;