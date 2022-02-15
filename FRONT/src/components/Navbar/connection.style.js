import styled from 'styled-components';

export const ConnectionContainer = styled.div`
    display: flex;
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
    background-color: #6adf76;
    background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
    transition: all 240ms ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #00c9ff;
    }

    &:not(:last-of-type) {
        margin-right: 7px;
    }
`;

export const LogginButton = styled.button`
    border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid #00c9ff;
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #00c9ff;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;