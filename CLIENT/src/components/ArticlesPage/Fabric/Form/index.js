import React, { useState, useEffect } from 'react';
import { FormContainer, 
         ButtonForm, 
        InputContainer,
        DefaultFabricPicture,
        FabricPicture
      } from './Form.style';
import FormInput from '../Input';
import YtremaLogo from '../../../../../src/assets/images/logo.png';



export function FabricForm() {

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

    const inputs = [
      {
        id: 1,
        name:'fabricPicture',
        type:'file',
        accept:'image/*',
        placeholder:'Photo du tissu',
        label:'Photo du tissu',
        errorMessage:'Doit être un fichier de type image',
        required: true
      },
      {
        id: 2,
        name:'fabricName',
        type:'text',
        placeholder:'nom du tissu',
        label:'Nom du tissu',
        errorMessage:'Le nom du tissu doit comporter entre 2 et 50 caractères',
        pattern:'^[A-Za-z0-9]{2,50}$',
        required: true
      },
      {
        id: 3,
        name:'website',
        type:'text',
        placeholder:'site web ou magasin',
        label:'Site web ou magasin',
        errorMessage:'Ce champ doit comporter entre 2 et 50 caractères',
        pattern:'^[A-Za-z0-9]{2,50}$',
        required: true

      },
      {
        id: 4,
        name:'designerName',
        type:'text',
        placeholder:'nom du designer',
        label:'Nom du designer',
        errorMessage:'Le nom du designer doit comporter entre 2 et 30 caractères',
        pattern: '^[A-Za-z0-9]{2,30}$',
        required: true
      },
      {
        id: 5,
        name:'color',
        type:'select',
        placeholder:'couleur',
        label:'Couleur',
        htmlFor: 'color',
        optionsList: ['bleu','rouge', 'orange', 'jaune', 'vert', 'rose', 'violet', 'marron', 'gris', 'noir', 'blanc', 'multicolore', 'beige', 'or', 'argent'],
        errorMessage:'Sélectionnez une couleur principale',
        required: true
      },
      {
        id: 6,
        name:'preciseColor',
        type:'text',
        placeholder:'couleur précise',
        label:'Couleur précise',
        pattern: '^[A-Za-z0-9 ]{2,30}$',
        errorMessage:'Maximum 30 caractères et ne doit pas contenir de caractères spéciaux'
      },
      {
        id: 7,
        name:'fabricType',
        type:'select',
        placeholder:'type de tissu',
        label:'Type de tissu',
        htmlFor: 'fabricType',
        optionsList: [ 'batiste','bords-côtes', 'broderie anglaise', 'canvas', 'chambray', 'crêpe', 'cretonne', 'cuir', 'dentelle', 'denim', 'coton enduit', 'éponge', 'flanelle', 'imitation fourrure', 'gabardine', 'gaze, double gaz', 'jacquard', 'jersey', 'toile de jute', 'laine bouillie', 'liège', 'lin', 'lycra', 'maille', 'matelassé', 'minky', 'mousseline', 'nicky', 'organza', 'popeline', 'polaire', 'pul', 'organza', 'sergé de coton', 'simili cuir', 'suédine', 'soie', 'sweat/molleton',  'tartan', 'tencel', 'thermocollant/entoilage', 'toile cirée', 'tulle', 'twill', 'velours', 'viscose', 'voile de coton', 'wax africain' ],
        errorMessage:'Sélectionnez un type de tissu',
        required: true
      },
      {
        id: 8,
        name:'composition',
        type:'text',
        placeholder:'composition',
        label:'Composition',
        pattern: '^[A-Za-z0-9_\\-\\/\\%\\.\\,]{1,80}$',
        errorMessage:'Maximum 80 caractères'
      },
      {
        id: 9,
        name:'weight',
        type:"number",
        placeholder:'poids en gramme',
        label:'Poids en gramme',
        min: 10,
        max: 600,
        // pattern: '^[1-9]$|^[1-9][0-9]$|^(600)$',
        errorMessage:'entrez un nombre entre 10 et 600'
      },
      {
        id: 10,
        name:'quantity',
        type:"number",
        placeholder:'quantité en cm',
        label:'Quantité en cm',
        min: 10,
        max: 1000,
        step: 10,
        errorMessage:'entrez un nombre entre 10 et 1000',
        required: true

      },
      {
        id: 11,
        name:'width',
        type:"number",
        placeholder:'laize en cm',
        label:'Laize en cm',
        min: 10,
        max: 400,
        step: 5,
        errorMessage:'entrez un nombre entre 10 et 400',
        required: true
      },
      {
        id: 12,
        name:'price',
        type:"number",
        placeholder:'prix au mètre en euros',
        label:'Prix au mètre',
        min: 1,
        max: 200,
        errorMessage:'entrez un nombre entre 1 et 200',
        required: true
      },
    ];
    const [focused, setFocused] = useState(false);
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

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
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
        {inputs.map((input) => (
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
