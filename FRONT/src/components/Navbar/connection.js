import React from "react";
import styled from "styled-components";

const ConnectionContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #2a9d8f;
  background-image: linear-gradient(to right, transparent 0%, #ffc43d 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #ffc43d;
  }
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
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

export function Connection(props) {
  return (
    <ConnectionContainer>
      <RegisterButton>Register</RegisterButton>
      <LoginButton>Login</LoginButton>
    </ConnectionContainer>
  );
}