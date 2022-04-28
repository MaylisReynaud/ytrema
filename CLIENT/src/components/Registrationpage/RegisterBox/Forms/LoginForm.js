import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSigninUserMutation} from '../../../../store/api/ytremaApi';
import { setUser } from '../../../../store/state/authSlice';


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
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password:""
  });

  const [signinUser, { data, isLoading, error, isError, isSuccess }] = useSigninUserMutation();
    useEffect(() => {
      if (isSuccess) {
        dispatch(setUser(data));
        navigate('/tissus');
        localStorage.setItem("token", data.memberToken);
      };
    }, [data]);
  

  const { switchToSignup } = useContext(RegisterContext);

  const handleChange = (event) => {
    event.persist();
    setFormState((prev) => ({...prev, [event.target.name]: event.target.value}))
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input 
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={handleChange}
        />
      <Input 
        name="password" 
        type="password" 
        placeholder="Password" 
        autoComplete='on' 
        onChange={handleChange}
      />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Mot de passe oublié?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton 
        onClick={() => {
          signinUser(formState);
        }}
        isLoading={isLoading}
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