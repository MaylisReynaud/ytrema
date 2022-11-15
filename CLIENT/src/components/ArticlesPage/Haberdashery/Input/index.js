import React, { useState } from "react";
import {
  InputContainer,
  InputForm,
  LabelForm,
  SelectForm,
  ErrorMessage,
} from "./style";

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
    isVerif,
    isVerifInput,
    labelSpe,
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
        {required ? <LabelForm htmlFor={htmlFor}>{labelSpe ? labelSpe : label}*</LabelForm> : <LabelForm htmlFor={htmlFor}>{label}</LabelForm>}
        {type === "select" ? (
          <SelectForm
            {...inputProps}
            type={type}
            onChange={onChange}
            id={htmlFor}
            onBlur={handleBlur}
            required={required}
          >
             
            <option value="" defaultValue disabled hidden>--Choisissez votre {id == 5 || id == 8 ? " réponse" : label.toLowerCase()}--</option>
            {options.sort().map((option, index) => (
              <option key={index} value={option}>

              {option == 'false' ? 'non' : ( option == 'true' ? 'oui' : option)}     
              
              </option>
            ))}
          </SelectForm>
        ) : (
          <InputForm
            {...inputProps}
            onChange={onChange}
            type={type}
            onBlur={handleBlur}
            className={(id != "10") && (isError || isVerif && isVerifInput) && 'input-false'}
            pattern={pattern}
            required={required}
          />
        )}
        {isError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        {(type == 'select') && (props.value == "" ) && (typeof(props.value) !== "boolean") && (<ErrorMessage>{errorMessage}</ErrorMessage>)}
      </InputContainer>
    </>
  );
}

export default FormInput;
