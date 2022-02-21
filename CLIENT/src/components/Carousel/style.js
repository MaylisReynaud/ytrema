import styled from 'styled-components';
import { width } from './index';


export const CarouselContainer = styled.div`
  border: 1px solid red;
  position: relative;
  overflow: hidden;
  width: ${width};
`;
export const Children  = styled.div`
  width: ${width};
  position: relative;
  height: ${height};
`;
export const Arrow = styled.div`
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: ${height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  &.${props => props.right ? css`left: 90%;` : css`left: 0%;`}
`;
export const Dot = styled.span`
  font-size: 1.5em;
  cursor: pointer;
  text-shadow: 1px 1px 1px #fff;
  user-select: none;
`;
export const Dots = styled.span`
  text-align: center;
  width: ${width};
  z-index: 100;
`;