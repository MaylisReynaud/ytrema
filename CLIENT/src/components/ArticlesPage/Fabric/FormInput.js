import React from 'react';
import { FabricForm, 
         InputForm, 
         LabelForm,
         ErrorMessage 
        } from './FormInput.style';

function FormInput(props) {
    const {label,ErrorMessage, onChange, id, ...inputProps} = props;
  return (
    <FabricForm>
        <LabelForm>
            {label}
        </LabelForm>
        <InputForm
            {...inputProps}
            onChange={onChange}
        />
        <ErrorMessage>
            {ErrorMessage}
        </ErrorMessage>
    </FabricForm>
  
  )
};

export default FormInput;