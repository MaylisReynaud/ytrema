import React from 'react';
// import YtremaLogo from '../../../assets/images/logo.png';
import YtremaLogo from '../../../assets/images/logo-ytrema.png';
import { LogoWrapper, LogoImg } from './style';
import  { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export function Logo(props) {
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const isLogged = auth.isLogged;
  let navigate = useNavigate();
  return (
    <>
    {isLogged === false && (
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
    )
}
{isLogged === true && (
    <LogoWrapper>
      <LogoImg>
        <img 
          src={YtremaLogo} 
          alt="ÿ tréma logo" 
          onClick={() => {
            navigate('/tissus');
          }}
        />
      </LogoImg>
    </LogoWrapper>
    )
}
</>
  );
}