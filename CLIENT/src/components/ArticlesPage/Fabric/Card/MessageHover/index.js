import React, { useState } from "react";
import { MessageHoverContainer, MessageHoverIcon, MessageHoverText} from "./style";

export function MessageHover(props) {
  const {
    error
  } = props;
    //Handle error message on hover
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
      setIsHovering(!isHovering);
    };
//   const [isError, setIsError] = useState(false);

//   const handleBlur = (event) => {
//     console.log(event, "Je suis sortie de l'input");

//     if (!event.target.value) {
//       // console.log("Le champs est vide");
//       setIsError(true);
//     } else {
//       // Vérifier la value
//       const regex = new RegExp(pattern);

//       // console.log(regex.test(event.target.value));
//       if (!regex.test(event.target.value)) {
//         // console.log("C'est faux on balance la phrase");
//         setIsError(true);
//       } else {
//         setIsError(false);
//       }
//     }
//   };

  return (
    <>
    <MessageHoverContainer>
      <MessageHover>
        <MessageHoverIcon onClick={handleMouseOver} />
        

        {isHovering && <h2>{error}</h2>}
      </MessageHover>
    </MessageHoverContainer>
      {/* <InputContainer>
        <LabelForm htmlFor={htmlFor}>{label}</LabelForm>   
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
      </InputContainer> */}
    </>
  );
}

//export default MessageHover;
