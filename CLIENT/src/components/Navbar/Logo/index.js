import React from 'react';
// import YtremaLogo from '../../../assets/images/logo.png';
import YtremaLogo from '../../../assets/images/logo-ytrema.png';
import { LogoWrapper, LogoImg } from './style';
import  { useNavigate } from 'react-router-dom';

export function Logo(props) {
  let navigate = useNavigate();
  return (
    <LogoWrapper>
      <LogoImg>
        <img 
          src={YtremaLogo} 
          alt="ÿ tréma logo" 
          onClick={() => {
            navigate('/');
          }}
        />
      </LogoImg>
    </LogoWrapper>
  );
}