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

export function LoginForm(props) {
  const { switchToSignup } = useContext(RegisterContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Mot de passe oublié?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton 
        type="submit"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Se connecter
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Vous n'avez pas de compte?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Créer un compte
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}