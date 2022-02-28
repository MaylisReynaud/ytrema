import styled from 'styled-components';
import { motion } from 'framer-motion';
import {DeviceSize} from '../../Navbar/Responsive';

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const FormContainer = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
  @media screen and (max-width:${DeviceSize.mobile}) {
    width: 100%
  }
`;

export const MutedLink = styled.div`
  font-size: 0.7rem;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 0.7rem;
  color: rgb(241, 196, 15);
  font-weight: 500;
  text-decoration: none;
  margin: 0 0.4rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0rem 1rem;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 0.8rem;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled(motion.button)`
  width: 50%;
  padding: 0.8rem;
  color: #fff;
  font-family: "ProximaNova-Regular";
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
  &:hover {
    filter: brightness(1.03);
  }
  @media screen and (max-width:${DeviceSize.mobile}) {
    width: 100%
  }
  `;

  export const buttonVariants = {
    hover: {
      scale: 1.15,
      textShadow: '0px 0px 8px rgb(255, 255, 255)',
      boxShadow: '0px 0px 8px rgb(255, 255, 255)',
    },
    tap :{
      scale: 0.95,
    }
  };
