import React from 'react';
import YtremaLogo from '../../../assets/images/logo.png';
import { LogoWrapper, LogoImg } from './style';

export function Logo(props) {
  return (
    <LogoWrapper>
      <LogoImg>
        <img src={YtremaLogo} alt="ÿ tréma logo" href="/" />
      </LogoImg>
    </LogoWrapper>
  );
}