import React, {useState} from 'react';
import { InputContainer, 
         InputForm, 
         LabelForm,
         ErrorMessage
        } from './FormInput.style';

function FormInput(props) {
   
    const  { label, onChange, id, errorMessage, ...inputProps } = props;
    console.log(props, 'nous sommes dans le forminput');

    const handleFocus = (event) => {
      setFocused(true);
    };

  return (
    <>
        <InputContainer>
        <LabelForm>
            {label}
        </LabelForm>
        <InputForm 
            {...inputProps}
            onChange={onChange}
            // onBlur={handleFocus}
            // onFocus={() => inputProps.name === 'price' && setFocused(true) }
            // focused={focused.toString()}
            
        />
          <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
   
            
    </InputContainer>

  </>
  );
};

export default FormInput;
