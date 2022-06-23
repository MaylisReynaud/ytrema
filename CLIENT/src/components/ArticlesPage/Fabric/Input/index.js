import React, { useState } from "react";
import {
  InputContainer,
  InputForm,
  LabelForm,
  SelectForm,
  ErrorMessage,
} from "./Input.style";

function FormInput(props) {

  const {
    type,
    label,
    onChange,
    id,
    options,
    htmlFor,
    errorMessage,
    pattern,
    required,
    ...inputProps
  } = props;
  const [isError, setIsError] = useState(false);
 
  const handleBlur = (event) => {
  
    if (!event.target.value) {
      setIsError(true);
    } else {
      // Vérifier la value
      const regex = new RegExp(pattern);

      if (!regex.test(event.target.value)) {

        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  };

  return (
    <>
      <InputContainer>
      {required ? <LabelForm htmlFor={htmlFor}>{label}*</LabelForm> :  <LabelForm htmlFor={htmlFor}>{label}</LabelForm> }  
        {type === "select" ? (
          <SelectForm
            {...inputProps}
            type={type}
            onChange={onChange}
            id={htmlFor}
            onBlur={handleBlur}
          >
            <option value="" defaultValue disabled hidden>--Choisissez votre {label.toLowerCase()}--</option>
            {options.sort().map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </SelectForm>
        ) : (
          <InputForm
            {...inputProps}
            onChange={onChange}
            type={type}
            onBlur={handleBlur}
            className={isError && 'input-false'}
            pattern={pattern}
          />
        )}
        {isError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </InputContainer>
    </>
  );
}

export default FormInput;
