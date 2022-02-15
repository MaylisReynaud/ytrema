import React from "react";
import styled from "styled-components";
import YtremaLogo from "../../assets/images/logo.png";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 29px;
  height: 29px;
  img {
    width: 100%;
    height: 100%;
  }
`;


export function Logo(props) {
  return (
    <LogoWrapper>
      <LogoImg>
        <img src={YtremaLogo} alt="ÿ tréma logo" />
      </LogoImg>
    </LogoWrapper>
  );
}