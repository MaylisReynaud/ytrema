import React, {useState} from 'react';
import { InputContainer, 
         InputForm, 
         LabelForm,
         ErrorMessage
        } from './FormInput.style';

function FormInput(props) {
   const [focused, setFocused] = useState(false);
    const  { label, onChange, id, errorMessage, ...inputProps } = props;

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
            onBlur={handleFocus}
            onFocus={() => inputProps.name === 'price' && setFocused(true) }
            focused={focused.toString()}
        />
            <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
    </InputContainer>

  </>
  );
};

export default FormInput;
