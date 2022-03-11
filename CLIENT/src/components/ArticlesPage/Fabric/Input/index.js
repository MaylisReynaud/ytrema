import React, {useRef} from 'react';
import { InputContainer, 
         InputForm, 
         LabelForm,
         SelectForm,
         ErrorMessage
        } from './Input.style';

function FormInput(props) {
    const inputElement = useRef(null);
  
    const handleFocus =() => {
      inputElement.current.focus();
      console.log(inputElement.current.focus(), 'inputElement');
    };

    const  { type, label, onChange, id, options, htmlFor, errorMessage, ...inputProps } = props;
 

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
            type={type}
            ref={inputElement}
            onChange={onChange}
            id={htmlFor}
            onFocus={handleFocus}
          >
            {options.map((option, index) => 
             <option key={index} value={option} >{option}</option>
            )}
          </SelectForm> : 
          
          <InputForm 
            {...inputProps}
            onChange={onChange}
            type={type}
            ref={inputElement}
            onFocus={handleFocus}
            
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
