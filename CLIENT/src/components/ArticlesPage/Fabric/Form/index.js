import React, { useState, useEffect } from 'react';
import { storage } from '../../../../Firebase';
import { toast } from 'react-toastify';
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
import { useSelector, useDispatch } from 'react-redux';
import { addFabric } from "../../../../store/state/fabricSlice";
import { useNavigate } from 'react-router-dom';
import { useAddOneFabricMutation } from "../../../../../src/store/api/ytremaApi";

export function FabricForm({ setShowModal, showModal }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const fabrics = persistedReducer.fabrics;
  const [addOneFabric, { data, error, isLoading, isSuccess, isError }] = useAddOneFabricMutation(auth.id);

console.log(isError, 'ici isError');
  useEffect(() => {
    if (isSuccess) {
      dispatch(addFabric(data.savedFabric));
      navigate('/tissus');
      toast.success('Tissu ajouté avec succès 🎉', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored",
        role:"alert"
        }); 
    };
    if (isError) {
      toast.error("Erreur : le tissu n'a pas été ajouté", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored",
        role:"alert"
        }); 
    }
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

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [photoURL, setPhotoURL] = useState();


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

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(event.target.files[0]);

  }

  //propre a firebase
  const handleUpload = (file) => {

    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setPhotoURL(url);
          });
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valuesToSend = values;
    valuesToSend.photo = photoURL;
    await addOneFabric({ memberId: auth.id, body: valuesToSend });
    setShowModal(prev => !prev)
    // toast.success('Tissu ajouté avec succès 🎉', {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme:"colored",
    //   role:"alert"
    //   }); 


  };



  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    //ici on check avec un switch les patterns et on affiche les messages d'erreur en fonction
    if (event.target.name === 'photo') {
      onSelectFile(event);
      if (!event.target.files || event.target.files.length > 0) {
        handleUpload(event.target.files[0]);
      }
    }
  };

  return (
    <>     
        <FormContainer
          onSubmit={handleSubmit}
        >
          <InputContainer>
            {values.photo ?
              <FabricPicture src={preview} alt="default fabric picture" />
              :
              <DefaultFabricPicture src={YtremaLogo} alt="default fabric picture" />
            }
            {fabricInputs.map((input) => (
              input.type === "select" ? (
                <FormInput
                key={input.id}
                {...input}
                onChange={onChange}
                value={values[input.name]}
                options={input.optionsList}
              />
               
              ) : 
              <FormInput
                key={input.id}
                {...input}
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
