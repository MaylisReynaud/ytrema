import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { colors, 
         fabricsType, 
         quantity, 
         width, 
         validationSchema 
        } from './validationSchema';

export function FabricForm() {
    const initialValues = {
        picture: '',
        fabricName: '',
        website: '',
        designerName: '',
        color: '',
        fabric: '',
        composition: '',
        weight: '',
        quantity: '',
        width: '',
        price: '',
    };
    
    const handleSubmit = (values) => {
        console.log(values);
    };

  return (
    <div>FabricForm</div>
  )
}

export default FabricForm