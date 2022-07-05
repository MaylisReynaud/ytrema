import React, { useContext, useEffect, useState } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  buttonVariants
} from './style';
import { Marginer } from '../Marginer';
import { RegisterContext } from '../registerContext';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSignupUserMutation } from '../../../../store/api/ytremaApi';
import { addUser } from '../../../../store/state/authSlice';

export function SignupForm(props) {
  const { switchToSignin } = useContext(RegisterContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupFormState, setSignupFormState] = useState({
    email: "",
    pseudo: "",
    password: "",
    checkPassword: "",
  });

  const [signupUser, { data, isLoading, error, isError, isSuccess }] = useSignupUserMutation();
  useEffect(() => {
    if (isSuccess) {
      data = data.newMember;
      dispatch(addUser(data));
      navigate('/connexion');
    };
  }, [data]);

  const handleChange = (event) => {
    event.persist();
    setSignupFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      signupUser(signupFormState);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          name="pseudo"
          type="text"
          placeholder="Pseudo"
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Mot de passe"
          autoComplete='on'
          onChange={handleChange}
        />
        <Input
          name="checkPassword"
          type="password"
          placeholder="Confirmez votre mot de passe"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton
        onClick={() => {
          signupUser(signupFormState);
        }}
        isLoading={isLoading}
        type="submit"
        variants={buttonVariants}
        whileHover='hover'
        whileTap='tap'
      >
        S'inscrire
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Déjà inscrit ?
        <BoldLink href="#" onClick={switchToSignin}>
          Se connecter
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

