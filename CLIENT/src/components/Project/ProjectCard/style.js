import styled from 'styled-components';
import { ArrowSmLeft } from "@styled-icons/heroicons-outline";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  height: 86vh;
  width: 100%;
  overflow-y: scroll;
  /* margin-bottom: 0; */
  background-color: blue;
  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  /* margin-bottom: 0; */
  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  padding-left: .5rem;
  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const ReturnArrow = styled(ArrowSmLeft)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-left: 0.8em;
  color: ${(props) => props.theme.color3};
  @media screen and (min-width: 601px) {
    /* left: 1.5rem; */
  }
`;
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  @media screen and (min-width: 601px) {
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ProjectTitle = styled.h1`
  font: 1.1rem "${(props) => props.theme.textFont}";
  font-weight: bold;
  padding: .5em;
  text-align: center;
  color: ${(props) => props.theme.color2};
  @media screen and (min-width: 601px) {
  }
`;