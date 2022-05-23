import React, { useState, useEffect, useRef } from 'react';
import {
  FormContainer,
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
import { useSelector, useDispatch } from 'react-redux';
import { addFabric } from "../../../../store/state/fabricSlice";
import { useNavigate } from 'react-router-dom';
import { useAddOneFabricMutation } from "../../../../../src/store/api/ytremaApi";

export function FabricForm({ setShowModal, showModal }) {
  let navigate = useNavigate();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const [addOneFabric, { data, error, isLoading, isSuccess }] = useAddOneFabricMutation(auth.id);
  console.log(data, '<---DATA DEBUT');

  useEffect(() => {
    if (isSuccess) {
      dispatch(addFabric(data.savedFabric));
      navigate('/tissus');
      ;
    };
  }, [data]);

  const [values, setValues] = useState({
    photo: '',
    name: '',
    website: '',
    designer: '',
    color: '',
    precise_color: '',
    fabric: '',
    composition: '',
    weight: '',
    quantity: '',
    width: '',
    price: '',
  });



  // const [focused, setFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  console.log(showModal, 'ici SHOW MODAL debut fhichier');


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

  const handleSubmit =  async (event) => {
    event.preventDefault();
    await addOneFabric({ memberId: auth.id, body: values });
    console.log(isSuccess, 'ici is Sucess')
    setShowModal(prev => !prev)

  //   if (isSuccess) {
  //     dispatch(addFabric(data.savedFabric));
  //     navigate('/tissus');
  //   }
  };



  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    //ici on check avec un switch les patterns et on affiche les messages d'erreur en fonction
    if (event.target.name === 'photo') {
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
          ))}
        </InputContainer>
        <ButtonForm
          type='submit'
          onClick={handleSubmit}


        >
          Enregister
        </ButtonForm>
      </FormContainer>
    </>
  )
};
