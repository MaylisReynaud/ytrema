import React, {useState} from 'react';
import { FabricForm, 
         InputForm, 
         LabelForm,

        } from './FormInput.style';

function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const {label, onChange, id, ...inputProps} = props;
    const handleFocus = (event) => {
        setFocused(true);
    };

  return (
    <FabricForm>
        <LabelForm>
            {label}
        </LabelForm>
        <InputForm
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
        />
        {/* <ErrorMessage>
            {ErrorMessage}
        </ErrorMessage> */}
    </FabricForm>
  
  )
};

export default FormInput;