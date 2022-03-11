import React, {useState} from 'react';
import { InputContainer, 
         InputForm, 
         LabelForm,
         SelectForm,
         ErrorMessage
        } from './Input.style';

function FormInput(props) {
   
    const  { label, onChange, id, type, options, htmlFor, errorMessage, ...inputProps } = props;
    console.log(props, 'nous sommes dans le forminput');

    const handleFocus = (event) => {
      setFocused(true);
    };

  return (
    <>
        <InputContainer>
        <LabelForm
          htmlFor={htmlFor}
        >
            {label}
        </LabelForm>
        {type === 'select' ?
          <SelectForm
          {...inputProps}
            onChange={onChange}
            id='color'
          >
            {options.map((option, index) => 
             <option value={option}>{option}</option>
            )}
          </SelectForm> : 
          <InputForm 
            {...inputProps}
            onChange={onChange}
            // focused={focused.toString()}
        />
      }
          <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
   
            
    </InputContainer>

  </>
  );
};

export default FormInput;
