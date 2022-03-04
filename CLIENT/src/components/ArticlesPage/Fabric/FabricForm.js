import React from 'react';
import { FormContainer } from './FabricForm.style';
import FormInput from './FormInput';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { colors, 
//          fabricsType, 
//          quantity, 
//          width, 
//          validationSchema 
//         } from './validationSchema';

export function FabricForm() {
    // const initialValues = {
    //     picture: '',
    //     fabricName: '',
    //     website: '',
    //     designerName: '',
    //     color: '',
    //     fabric: '',
    //     composition: '',
    //     weight: '',
    //     quantity: '',
    //     width: '',
    //     price: '',
    // };
    
    // const handleSubmit = (values) => {
    //     console.log(values);
    // };

  return (
    <FormContainer>
          <FormInput />
          <FormInput />
          <FormInput />
    </FormContainer>

  )
};