import React, { useState, useEffect } from 'react';
import { storage } from '../../../../Firebase';
import { toast } from 'react-toastify';
import {
  FormContainer,
  ButtonForm,
  InputContainer,
  DefaultArticlePicture,
  ArticlePicture
} from './style';
import FormInput from '../Input';
import YtremaLogo from '../../../../../src/assets/images/logo.png';
import { haberdasheryInputs } from '../../../../utils/haberdasheryInputs';
import { useSelector, useDispatch } from 'react-redux';
import { addHaberdashery } from "../../../../store/state/haberdasherySlice";
import { useNavigate } from 'react-router-dom';
import { useAddOneHaberdasheryMutation } from "../../../../../src/store/api/ytremaApi";

export function HaberdasheryForm({ setShowModal, showModal }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const haberdasheries = persistedReducer.haberdasheries;
  const [addOneHaberdashery, { data, error, isLoading, isSuccess, isError }] = useAddOneHaberdasheryMutation(auth.id);


  useEffect(() => {
    if (isSuccess) {
      dispatch(addHaberdashery(data.savedHaberdashery));
      navigate('/mercerie');
      toast.success('Article de mercerie ajouté avec succès 🎉', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        role: "alert"
      });

    };
    if (error) {
      toast.error("Oups, l'article de mercerie ne s'est pas ajouté", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        role: "alert"
      });
    }
  }, [data, error, isError]);

  const [values, setValues] = useState({
    photo: '',
    name: '',
    website: '',
    size: '',
    color: '',
    precise_color: '',
    haberdashery: '',
    is_cut: '',
    is_a_set: '',
    stock_qty: '',
    unity: '',
    article_qty: '',
    price: '',
  });

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [photoURL, setPhotoURL] = useState();
  // const [isVerif, setIsVerif] = useState(false);
  let isVerif = false;
  const [isVerifInput, setIsVerifInput] = useState(false);


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
  const handleSubmit = async (event) => {
    console.log(values, '<--values');
    event.preventDefault();
    //CAS 1 : bouton piece (is_cut FALSE & is_a_set FALSE)
    if ( values.is_cut == "false" && values.is_a_set == "false") {
      values.article_qty= "1"
    }
  // CAS 2 : Bouton vendue en lot id 5 (is_cut FALSE & is_a_set TRUE)
  if ( values.is_cut == "false" && values.is_a_set == "true") {
    values.stock_qty=  values.stock_qty*values.article_qty
  }
  // CAS 3 : Bobine de fil id 10 (is_cut TRUE & is_a_set FALSE)
  if ( values.is_cut == "true") {
    values.stock_qty=values.size
  }

    const valuesToSend = values;
    const boolValueIsCut = (valuesToSend.is_cut == 'true') ? true : false;
    valuesToSend.is_cut = boolValueIsCut;
    const boolValueIsASet = (valuesToSend.is_a_set == 'true') ? true : false;
    valuesToSend.is_a_set = boolValueIsASet;

    valuesToSend.photo = photoURL;
    
    if (valuesToSend.name != "" &&
      valuesToSend.photo != undefined &&
      valuesToSend.website != "" &&
      valuesToSend.size != "" &&
      valuesToSend.color != "" &&
      valuesToSend.haberdashery != "" &&
      valuesToSend.stock_qty != "" &&
      valuesToSend.unity != "" &&
      valuesToSend.article_qty != "" &&
      (typeof (valuesToSend.is_cut) == 'boolean') &&
      (typeof (valuesToSend.is_a_set) == 'boolean') &&
      valuesToSend.price != "") {

      console.log(valuesToSend, '<-valuesto send avant addOneH')
      await addOneHaberdashery({ memberId: auth.id, body: valuesToSend });
      setShowModal(prev => !prev)
    } else {
      console.log('coucou dans le else')
      haberdasheryInputs.map((input) => {
        if (input.required && (valuesToSend[input.name] == "" || valuesToSend[input.name] == undefined || valuesToSend[input.name] == null)) {
          isVerif = true;
          setIsVerifInput(true);
        }
      })
    }
  };



  return (
    <>
      <FormContainer>
        <InputContainer>
          {values.photo ?
            <ArticlePicture src={preview} alt="default haberdashery picture" />
            :
            <DefaultArticlePicture src={YtremaLogo} alt="default haberdashery picture" />
          }
          {haberdasheryInputs.map((input) => (
            input.type === "select" ? (
              input.id !== 6 ? (
                <FormInput
                  key={input.id}
                  {...input}
                  onChange={onChange}
                  value={values[input.name]}
                  options={input.optionsList}
                  isVerif={((input.required && values[input.name] == "") ? true : false)}
                  isVerifInput={isVerifInput}
                />
              ) :
                (
                  values.is_cut == "false" && input.id == 6 ? (
                    <FormInput
                      key={input.id}
                      {...input}
                      onChange={onChange}
                      value={values[input.name]}
                      options={input.optionsList}
                      isVerif={((input.required && values[input.name] == "") ? true : false)}
                      isVerifInput={isVerifInput}

                    />
                  ) : null
                )


            ) : (
              input.type !== "select" ? (
                input.id !== 7 && input.id !== 8 ? (
                  <FormInput
                    key={input.id}
                    {...input}
                    onChange={onChange}
                    options={input.optionsList}
                    isVerif={((input.required && values[input.name] == "") ? true : false)}
                    isVerifInput={isVerifInput}
                  />
                ) :
                  (
                    values.is_cut == "true" && input.id == 7 ? (
                      <FormInput
                        key={input.id}
                        {...input}
                        onChange={onChange}
                        options={input.optionsList}
                        isVerif={((input.required && values[input.name] == "") ? true : false)}
                        isVerifInput={isVerifInput}
                        labelSpeCreation={"Nombre d'article"}
                      />
                    ) : (
                      values.is_a_set == "true" && input.id == 7 ?
                        (
                          <FormInput
                            key={input.id}
                            {...input}
                            onChange={onChange}
                            options={input.optionsList}
                            isVerif={((input.required && values[input.name] == "") ? true : false)}
                            isVerifInput={isVerifInput}
                          />
                        ) :
                        (values.is_cut == "false" && values.is_a_set == "false" && input.id == 8 ? (
                          <FormInput
                            key={input.id}
                            {...input}
                            onChange={onChange}
                            options={input.optionsList}
                            isVerif={((input.required && values[input.name] == "") ? true : false)}
                            isVerifInput={isVerifInput}
                          />
                        )
                          : (values.is_cut == "false" && values.is_a_set == "true" && input.id == 8 ? 
                          (
                            <FormInput
                            key={input.id}
                            {...input}
                            onChange={onChange}
                            options={input.optionsList}
                            isVerif={((input.required && values[input.name] == "") ? true : false)}
                            isVerifInput={isVerifInput}
                            labelSpeCreation={"Nombre de lots achetés"}
                          />
                          ) : 
                          (null))
                        )
                    )
                  )
              ) :
                (
                  null
                )
            )

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


