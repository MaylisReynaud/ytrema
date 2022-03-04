import React, { useState } from 'react';
import { FormContainer, ButtonForm } from './FabricForm.style';
import FormInput from './FormInput';



export function FabricForm() {

    const [values, setValues] = useState ({
      fabricName: '',
      website: '',
      designerName: '',
      color: '',
      fabricType: '',
      composition: '',
      weight: '',
      quantity: '',
      width: '',
      price: '',
    });

    const inputs = [
      {
        id: 1,
        name:'fabricName',
        type:'text',
        placeholder:'nom du tissu',
        errorMessage:'',
        label:'Nom du tissu'

      },
      {
        id: 2,
        name:'website',
        type:'text',
        placeholder:'site web ou magasin',
        errorMessage:'',
        label:'Site web ou magasin'

      },
      {
        id: 3,
        name:'designerName',
        type:'text',
        placeholder:'nom du designer',
        errorMessage:'',
        label:'Nom du designer'

      },
      {
        id: 4,
        name:'color',
        type:'text',
        placeholder:'couleurs',
        errorMessage:'',
        label:'Couleurs'

      },
      {
        id: 5,
        name:'fabricType',
        type:'text',
        placeholder:'type de tissu',
        errorMessage:'',
        label:'Type de tissu'

      },
      {
        id: 6,
        name:'composition',
        type:'text',
        placeholder:'composition',
        errorMessage:'',
        label:'Composition'

      },
      {
        id: 7,
        name:'weight',
        type:'number',
        placeholder:'poids en gramme',
        errorMessage:'',
        label:'Poids en gramme'

      },
      {
        id: 8,
        name:'quantity',
        type:'number',
        placeholder:'quantité en cm',
        errorMessage:'',
        label:'Quantité en cm'

      },
      {
        id: 9,
        name:'width',
        type:'number',
        placeholder:'laize en cm',
        errorMessage:'',
        label:'Laize en cm'

      },
      {
        id: 10,
        name:'price',
        type:'number',
        placeholder:'prix au mètre en euros',
        errorMessage:'',
        label:'Prix au mètre'

      }
    ];



    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      console.log(Object.fromEntries(data.entries()));
    };

    const onChange= (event) => {
      setValues({...values, [event.target.name]: event.target.value })
    };

    console.log(values);

  return (
    <FormContainer
      onSubmit={handleSubmit}
    >
      {inputs.map((input) => (
         <FormInput 
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
       />
      ))}
       
       <ButtonForm>
         Enregister
       </ButtonForm>
    </FormContainer>

  )
};