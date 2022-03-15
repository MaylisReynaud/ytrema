import React, { useContext } from 'react';
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(RegisterContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input name="pseudo" type="text" placeholder="Pseudo" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Mot de passe" autoComplete='on' />
        <Input name="checkPassword" type="password" placeholder="Confirmez votre mot de passe" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton 
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

