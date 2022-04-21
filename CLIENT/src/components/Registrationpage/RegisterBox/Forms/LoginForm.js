import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../loginSlice';
import { useLoginMutation } from '../../../../services/login';

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
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const [formState, setFormState] = useState({
    email:"",
    password:""
  })
  
  const [login, {isLoading}] = useLoginMutation();
  const handleChange = (event) => {
    event.persist();
    // setEmail((prev) => ({...prev, email: event.target.value})),
    // setPassword((prev) => ({...prev, password: event.target.value}))
    
  
    // 1 STATE POUR CHAQUE
    

    console.log(event.target.value, "ici target value")
    setFormState((prev) => ({...prev, [event.target.name]: event.target.value}))
  }
  const { switchToSignup } = useContext(RegisterContext);
  const canLog = [formState.email, formState.password].every(Boolean) && !isLoading;
  const handleLogin = async () => {
    // console.log(email, 'ici email');
    // console.log(password, 'ici password');
    console.log(formState);
    if (canLog) {
      try {
       
        // const member = await login(formState).unwrap();
        const member = await login(formState);
        console.log(member, 'member dans le try de loginForm');
        
          // setEmail({email:""});
          // setPassword({password:""});
          setFormState( 
            {email: "",
            password: ""
          })
          dispatch(setCredentials(member))
          navigate("/");
        
      } catch (err) {
        console.error('Failed to login: ', err)
      }
    }
  };
// Ytrema#Member1
  return (
    <BoxContainer>
      <FormContainer>
        <Input 
          onChange={handleChange}
          name="email" 
          type="email" 
          placeholder="Email" 
        />
      <Input 
        onChange={handleChange}
        name="password" 
        type="password" 
        placeholder="Password" 
        autoComplete='on' 
      />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Mot de passe oublié?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton 
        onClick={handleLogin}
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