import React, { useState } from 'react';
import { FormContainer, ButtonForm, InputContainer} from './FabricForm.style';
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
      weight: ' ',
      quantity: ' ',
      width:' ',
      price: ' ',
    });

    const inputs = [

      {
        id: 1,
        name:'fabricName',
        type:'text',
        placeholder:'nom du tissu',
        label:'Nom du tissu'

      },
      {
        id: 2,
        name:'website',
        type:'text',
        placeholder:'site web ou magasin',
        label:'Site web ou magasin'

      },
      {
        id: 3,
        name:'designerName',
        type:'text',
        placeholder:'nom du designer',
        label:'Nom du designer'

      },
      {
        id: 4,
        name:'color',
        type:'text',
        placeholder:'couleur',
        label:'Couleur'
      },
      {
        id: 5,
        name:'preciseColor',
        type:'text',
        placeholder:'couleur précise',
        label:'Couleur précise'
      },
      {
        id: 6,
        name:'fabricType',
        type:'text',
        placeholder:'type de tissu',
        label:'Type de tissu'

      },
      {
        id: 7,
        name:'composition',
        type:'text',
        placeholder:'composition',
        label:'Composition'

      },
      {
        id: 8,
        name:'weight',
        type:'number',
        placeholder:'poids en gramme',
        label:'Poids en gramme',
      },
      {
        id: 9,
        name:'quantity',
        type:'number',
        placeholder:'quantité en cm',
        label:'Quantité en cm'

      },
      {
        id: 10,
        name:'width',
        type:'number',
        placeholder:'laize en cm',
        label:'Laize en cm'
      },
      {
        id: 11,
        name:'price',
        type:'number',
        placeholder:'prix au mètre en euros',
        label:'Prix au mètre',
      },
    ];



    const handleSubmit = (event) => {
      event.preventDefault();
     
    };

    const onChange= (event) => {
      setValues({...values, [event.target.name]: event.target.value });
    };

    console.log(values);

  return (
    <>
    <FormContainer
      onSubmit={handleSubmit}
    >
      <InputContainer>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
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

