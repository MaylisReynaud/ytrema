import React, { useState } from 'react';
import { FormContainer, ButtonForm, ErrorMessage } from './FabricForm.style';
import FormInput from './FormInput';



export function FabricForm() {

    const [values, setValues] = useState ({
      fabricName: '',
      website: '',
      designerName: '',
      color: '',
      preciseColor:'',
      fabricType: '',
      composition: '',
      weight: null,
      quantity: null,
      width:null,
      price: null,
    });

    const inputs = [

      {
        id: 1,
        name:'fabricName',
        type:'text',
        placeholder:'nom du tissu',
        errorMessage:'Le nom du tissu doit comporter entre 2 et 50 caractères',
        label:'Nom du tissu',
        pattern:'^[A-Za-z0-9]{2,50}$',
        required: true

      },
      {
        id: 2,
        name:'website',
        type:'text',
        placeholder:'site web ou magasin',
        errorMessage:'',
        label:'Site web ou magasin',
        required: true

      },
      {
        id: 3,
        name:'designerName',
        type:'text',
        placeholder:'nom du designer',
        errorMessage:'Le nom du designer doit comporter entre 2 et 30 caractères',
        label:'Nom du designer',
        required: true

      },
      {
        id: 4,
        name:'color',
        type:'text',
        placeholder:'couleur',
        errorMessage:'Sélectionnez une couleur principale',
        label:'Couleur',
        required: true

      },
      {
        id: 5,
        name:'preciseColor',
        type:'text',
        placeholder:'couleur précise',
        errorMessage:'Maximum 30 caractères et ne doit pas contenir de caractères spéciaux',
        label:'Couleur précise'
      },
      {
        id: 6,
        name:'fabricType',
        type:'text',
        placeholder:'type de tissu',
        errorMessage:'Sélectionnez un type de tissu',
        label:'Type de tissu',
        required: true

      },
      {
        id: 7,
        name:'composition',
        type:'text',
        placeholder:'composition',
        errorMessage:'Maximum 80 caractères',
        label:'Composition'

      },
      {
        id: 8,
        name:'weight',
        type:'number',
        placeholder:'poids en gramme',
        errorMessage:'entrez un nombre entre 10 et 600',
        label:'Poids en gramme'

      },
      {
        id: 9,
        name:'quantity',
        type:'number',
        placeholder:'quantité en cm',
        errorMessage:'entrez un nombre entre 10 et 1000',
        label:'Quantité en cm',
        required: true

      },
      {
        id: 10,
        name:'width',
        type:'number',
        placeholder:'laize en cm',
        errorMessage:'entrez un nombre entre 10 et 400',
        label:'Laize en cm',
        required: true

      },
      {
        id: 11,
        name:'price',
        type:'number',
        placeholder:'prix au mètre en euros',
        errorMessage:'entrez un nombre entre 1 et 200',
        label:'Prix au mètre',
        required: true

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
      {inputs.map((input) => {
        <FormInput 
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
       />
      //  <ErrorMessage />
  })}
       
       <ButtonForm>
         Enregister
       </ButtonForm>
    </FormContainer>

  )
};