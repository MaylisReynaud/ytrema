import React, { useContext } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from './style';
import { Marginer } from '../Marginer';
import { RegisterContext } from '../registerContext';

export function SignupForm(props) {
  const { switchToSignin } = useContext(RegisterContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Pseudo" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Mot de passe" />
        <Input type="password" placeholder="Confirmez votre mot de passe" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">S'enregistrer</SubmitButton>
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

