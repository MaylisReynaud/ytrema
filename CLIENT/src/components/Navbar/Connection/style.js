import styled from 'styled-components';

export const ConnectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background: #ffb347; 
  background-image: linear-gradient(to right, transparent 0%, #ffcc33 100%);
  
  //background-color: #2a9d8f;
  //background-image: linear-gradient(to right, transparent 0%, #ffc43d 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #43cea2;
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

export const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #ffc43d;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid #ffc43d;
  transition: all 240ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #2a9d8f;
    background-color: #ffc43d;
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;