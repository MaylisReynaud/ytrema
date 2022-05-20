import React, { useState, useEffect } from 'react';
import { FormContainer, 
         ButtonForm, 
        InputContainer,
        DefaultFabricPicture,
        FabricPicture
      } from './Form.style';
import FormInput from '../Input';
import YtremaLogo from '../../../../../src/assets/images/logo.png';
import { fabricInputs } from '../../../../utils/fabricInputs';
// import {
//   addFabric,
// } from "../../../store/state/fabricSlice";
// import { useAddFabricMutation } from "../../../../src/store/api/ytremaApi";
import { useDispatch } from 'react-redux';


export function FabricForm() {

    const dispatch = useDispatch();

    const [values, setValues] = useState ({
      fabricPicture: '',
      fabricName: '',
      website: '',
      designerName: '',
      color: '',
      preciseColor:'',
      fabricType: '',
      composition: '',
      weight: '',
      quantity: '',
      width:'',
      price: '',
    });

    
    // const [focused, setFocused] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined);
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(event.target.files[0]);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
    };

    const onChange= (event) => {
      setValues({...values, [event.target.name]: event.target.value });
      //ici on check avec un switch les patterns et on affiche les messages d'erreur en fonction
      if (event.target.name === 'fabricPicture') {
        onSelectFile(event);

      }
      
      };
      

  return (
    <>
    <FormContainer
      onSubmit={handleSubmit}
    >
      <InputContainer>
        {values.fabricPicture ? 
          <FabricPicture src={preview} alt="default fabric picture" />
          :
          <DefaultFabricPicture src={YtremaLogo} alt="default fabric picture" />
        }
        {fabricInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            options={input.optionsList}
          />
        ) )}
      </InputContainer>
       <ButtonForm>
         Enregister
       </ButtonForm>
    </FormContainer>
    </>
  )
};
