import React from 'react';
import { InputContainer, 
         InputForm, 
         LabelForm
        } from './FormInput.style';

function FormInput(props) {
   
    const  { label, onChange, id, ...inputProps } = props;

  return (
    <InputContainer>
        <LabelForm>
            {label}
        </LabelForm>
        <InputForm 
            {...inputProps}
            onChange={onChange}
        />
    </InputContainer>
  
  );
};

export default FormInput;
