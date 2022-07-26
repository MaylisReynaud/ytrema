import React, { useRef, useState, useEffect } from "react";
import { storage } from "../../../../Firebase";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { DeviceSize } from "../../../Navbar/Responsive";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CardContainer,
  CardTitle,
  SizeTitle,
  TrashButton,
  ButtonsContainer,
  ReturnArrowContainer,
  ModifyDeleteContainer,
  Container,
  ImageCard,
  ImageContainer,
  UpdateCardContainer,
  UpdatePhotoInput,
  InformationContainer,
  InformationForm,
  InformationInput,
  InformationContent,
  InformationLabel,
  InformationLinkContainer,
  InformationLink,
  ButtonForm,
  ModifyButton,
  ReturnArrow,
  TitleContainer,
  ProjectContainer,
  ProjectImageContainer,
  ProjectImage,
  ProjectTitle,
  InformationSelect,
  ModifyContainer,
  TrashContainer,
  UpdateInformationContainer,
  UpdateInformationText,
  UpdateFileInputContainer,

} from "./style";
import { haberdasheryInputs } from "../../../../utils/haberdasheryInputs";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteOneHaberdasheryMutation,
  useUpdateOneHaberdasheryMutation,
} from "../../../../../src/store/api/ytremaApi";
import {
  updateHaberdashery,
  deleteHaberdashery,
} from "../../../../store/state/haberdasherySlice";
import { MessageHover } from "./MessageHover";
import { DeleteHaberdasheryModal } from "./DeleteModal";

export const HaberdasheryCard = (haberdashery, isOpenModal, setShowModal, showModal) => {
  const { id } = useParams();
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
  const cardRef = useRef();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const haberdasheries = persistedReducer.haberdasheries;
  const haberdasheryCard = haberdasheries.value.find((haberdashery) => haberdashery.id == id);
  const [deleteOneHaberdashery] = useDeleteOneHaberdasheryMutation(haberdasheryCard.id, auth.id);
  const [updateOneHaberdashery] = useUpdateOneHaberdasheryMutation(haberdasheryCard.id, auth.id);
  const [updateHaberdasheryInfo, setUpdateHaberdasheryInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isOpenDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  }

  const deleteCard = () => {
    const urlParams = {
      memberId: auth.id,
      haberdasheryId: haberdasheryCard.id,
    };
    deleteOneHaberdashery(urlParams);
    dispatch(deleteHaberdashery(haberdasheryCard.id));
    setShowDeleteModal(!showDeleteModal);
    navigate("/mercerie");
    toast.success('Article de mercerie supprimé avec succès👌', {
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

  const [values, setValues] = useState({
    photo: haberdasheryCard.photo,
    name: haberdasheryCard.name,
    website: haberdasheryCard.website,
    size: haberdasheryCard.size,
    color: haberdasheryCard.color,
    precise_color: haberdasheryCard.precise_color,
    haberdashery: haberdasheryCard.haberdashery,
    quantity: haberdasheryCard.quantity,
    unity: haberdasheryCard.unity,
    is_cut: haberdasheryCard.is_cut,
    price: haberdasheryCard.price,
  });

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    if (!selectedFile) {
      // setPreview(undefined);
      setPreview(haberdasheryCard.photo);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(event.target.files[0]);
  };

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
    console.log(photoURL, 'photoURL');
    if (photoURL !== undefined) {
      values.photo = photoURL;
     
    }
    if (values.is_cut == 'oui') {
      values.is_cut = true;
    } else if (values.is_cut == 'non') {
      values.is_cut = false;
    }
    const valuesToSend = values;
    console.log(valuesToSend, 'valuestosend')
    const urlParams = {
      memberId: auth.id,
      haberdasheryId: haberdasheryCard.id,
      body: valuesToSend,
    };

    const { updatedHaberdasheryData } = await updateOneHaberdashery(urlParams).unwrap();

    //  Mettre à jour le store
    dispatch(updateHaberdashery(updatedHaberdasheryData));
    setUpdateHaberdasheryInfo(false);
    toast.success('Article de mercerie modifié avec succès👌', {
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

  //problem with is cut: always show true even if I put false
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});

    if (event.target.name === "photo") {
      onSelectFile(event);
      if (!event.target.files || event.target.files.length > 0) {

        handleUpload(event.target.files[0]);
      }
    }
  };

  const updateCard = () => {
    setUpdateHaberdasheryInfo(true);
  };

  return (
    <>
      {isMobile && (
        <Container>
          <CardContainer>
            <ButtonsContainer>
              <ReturnArrowContainer>
                <ReturnArrow
                  aria-label="Retourner à la liste des articles de mercerie"
                  ref={cardRef}
                  onClick={() => {
                    navigate("/mercerie");
                  }}

                />
              </ReturnArrowContainer>
              <ModifyDeleteContainer>
                {!updateHaberdasheryInfo ? (
                  <>
                    <ModifyContainer>
                      <ModifyButton
                        aria-label="Modifier cet article de mercerie"
                        onClick={updateCard}
                      />
                    </ModifyContainer>
                    <TrashContainer>
                      <TrashButton
                        aria-label="Supprimer cet article de mercerie"
                        ref={cardRef}
                        onClick={isOpenDeleteModal}
                      />
                    </TrashContainer>
                    <DeleteHaberdasheryModal
                      setShowDeleteModal={setShowDeleteModal}
                      showDeleteModal={showDeleteModal}
                      deleteCard={deleteCard}
                    />


                  </>
                ) : (
                  <UpdateInformationContainer
                    // animate={{ x: 20 }}
                    // transition={{ type: "spring", stiffness: 100 }}
                    initial={{ x: '-80px' }}
                    animate={{ x: 0 }}
                    transition={{ type: "linear" }}
                  >
                    <UpdateInformationText>
                      Article de mercerie en cours de modification
                    </UpdateInformationText>

                  </UpdateInformationContainer>
                )}
              </ModifyDeleteContainer>
            </ButtonsContainer>

            <TitleContainer>
              <CardTitle>{haberdasheryCard.name}</CardTitle>
              <SizeTitle>{haberdasheryCard.size}</SizeTitle>
            </TitleContainer>
            {!updateHaberdasheryInfo ? (
              <ImageContainer>
                <ImageCard src={haberdasheryCard.photo} />
              </ImageContainer>
            ) : (
              <UpdateCardContainer>
                <UpdatePhotoInput>
                  <ImageCard src={preview} alt="haberdashery picture" />
                </UpdatePhotoInput>
                <div>
                  <input
                    name="photo"
                    accept="image/*"
                    placeholder="Photo de l'article de mercerie"
                    required=""
                    type="file"
                    onChange={onChange}
                  ></input>
                </div>
              </UpdateCardContainer>
            )}
            <InformationContainer>
              {updateHaberdasheryInfo ? (
                <InformationForm onSubmit={handleSubmit}>
                  {haberdasheryInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>

                        <InformationLabel htmlFor={input.htmlFor}>
                          {input.label}
                        </InformationLabel>
                        {input.type !== "select" ? (
                          <>
                            <InformationInput
                              placeholder={values[input.info]}
                              onChange={onChange}
                              type={input.type}
                              name={input.name}
                              pattern={input.pattern}
                              data-error={input.errorMessage}
                            ></InformationInput>

                            {input.id == 10 ? (
                              null
                            ) :
                              <MessageHover
                                errorMessage={input.errorMessage}
                              />}

                          </>
                        ) : (
                          <InformationSelect
                            placeholder={values[input.info]}
                            onChange={onChange}
                            name={input.name}
                            type={input.type}
                            id={input.htmlFor}
                            defaultValue={values[input.info] == false ? 'non' : ( values[input.info] == true ? 'oui' : values[input.info])}
                          >
                           
                           {input.optionsList.sort().map((option, index) =>
                           
                              option == values[input.info] ? (
                                <option key={index} value={option}>
                                  {option} 
                                </option>
                              ) : (
                                <option key={index} value={option == 'false' ? 'non' : ( option == 'true' ? 'oui' : option)}>
                                  {option == 'false' ? 'non' : ( option == 'true' ? 'oui' : option)}
                                </option>
                              )
                           )}
                          </InformationSelect>
                        )}
                      </InformationContent>
                    ) : null
                  )}
                  <ButtonForm>Enregistrer</ButtonForm>
                </InformationForm>
              ) : (
                <InformationForm>
                  {haberdasheryInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        <InformationLabel>{input.label}</InformationLabel>
                        {index === 2 && (haberdasheryCard[input.info].includes("http") | haberdasheryCard[input.info].includes("www") | haberdasheryCard[input.info].includes(".fr") | haberdasheryCard[input.info].includes(".com") | haberdasheryCard[input.info].includes(".net")) ? (
                          <InformationLinkContainer
                          >
                            <InformationLink
                              href={haberdasheryCard[input.info].includes("http") ? haberdasheryCard[input.info] : `https://${haberdasheryCard[input.info]}`}
                              target="_blank"
                            >
                              {haberdasheryCard[input.info]}
                            </InformationLink>
                          </InformationLinkContainer>
                        ) : (
                          <InformationInput
                            value={haberdasheryCard[input.info] == false ? 'non' : ( haberdasheryCard[input.info] == true ? 'oui' : haberdasheryCard[input.info])}
              
                            disabled="disabled"
                            type={input.type}
                          ></InformationInput>
                        )}

                      </InformationContent>
                    ) : null
                  )}
                </InformationForm>
              )}

              <ProjectContainer>
                <ProjectTitle>Projets avec cet article de mercerie</ProjectTitle>
                <ProjectImageContainer>
                  <ProjectImage src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                  <ProjectImage src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                  <ProjectImage src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                </ProjectImageContainer>
              </ProjectContainer>
            </InformationContainer>
          </CardContainer>

        </Container>
      )}

      {isDesktop && (
        <Container>
          <ButtonsContainer>
            <ReturnArrowContainer>
              <ReturnArrow
                aria-label="Retourner à la liste des articles de mercerie"
                ref={cardRef}
                onClick={() => {
                  navigate("/mercerie");
                }}

              />
            </ReturnArrowContainer>
            <ModifyDeleteContainer>
              {!updateHaberdasheryInfo ? (
                <>
                  <ModifyContainer>
                    <ModifyButton
                      aria-label="Modifier cet article de mercerie"
                      onClick={updateCard}
                    />
                  </ModifyContainer>
                  <TrashContainer>
                    <TrashButton
                      aria-label="Supprimer cet article de mercerie"
                      ref={cardRef}
                      onClick={isOpenDeleteModal}
                    />
                  </TrashContainer>
                  <DeleteHaberdasheryModal
                    setShowDeleteModal={setShowDeleteModal}
                    showDeleteModal={showDeleteModal}
                    deleteCard={deleteCard}
                  />


                </>
              ) : (
                <UpdateInformationContainer
                  // animate={{ x: 20 }}
                  // transition={{ type: "spring", stiffness: 100 }}
                  initial={{ x: '-80px' }}
                  animate={{ x: 0 }}
                  transition={{ type: "linear" }}
                >
                  <UpdateInformationText>
                    Article de mercerie en cours de modification
                  </UpdateInformationText>

                </UpdateInformationContainer>
              )}
            </ModifyDeleteContainer>
          </ButtonsContainer>
          <CardContainer>
            {!updateHaberdasheryInfo ? (
              <ImageContainer>
                <ImageCard src={haberdasheryCard.photo} />
              </ImageContainer>
            ) : (
              <UpdateCardContainer>
                <UpdatePhotoInput>
                  <ImageCard src={preview} alt="haberdashery picture" />
                </UpdatePhotoInput>
                <UpdateFileInputContainer>
                  <input
                    name="photo"
                    accept="image/*"
                    placeholder="Photo de l'article"
                    required=""
                    type="file"
                    onChange={onChange}
                  ></input>
                </UpdateFileInputContainer>
              </UpdateCardContainer>
            )}
            <InformationContainer>
              <TitleContainer>
                <CardTitle>
                  {haberdasheryCard.name} - {haberdasheryCard.size}
                </CardTitle>
              </TitleContainer>
              {updateHaberdasheryInfo ? (
                <InformationForm onSubmit={handleSubmit}>
                  {haberdasheryInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>

                        <InformationLabel htmlFor={input.htmlFor}>
                          {input.label}
                        </InformationLabel>
                        {input.type !== "select" ? (
                          <>
                            <InformationInput
                              placeholder={values[input.info]}
                              onChange={onChange}
                              type={input.type}
                              name={input.name}
                              pattern={input.pattern}
                              data-error={input.errorMessage}
                            ></InformationInput>
                            {input.id == 6 ? (
                              null
                            ) :
                              <MessageHover
                                errorMessage={input.errorMessage}
                              />}
                          </>
                        ) : (
                          <InformationSelect
                            placeholder={values[input.info]}
                            onChange={onChange}
                            name={input.name}
                            type={input.type}
                            id={input.htmlFor}
                            defaultValue={values[input.info]}
                          >
                            {input.optionsList.sort().map((option, index) =>
                              option === values[input.info] ? (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ) : (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </InformationSelect>
                        )}
                      </InformationContent>
                    ) : null
                  )}
                  <ButtonForm>Enregistrer</ButtonForm>
                </InformationForm>
              ) : (
                <InformationForm>
                  {haberdasheryInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        <InformationLabel>{input.label}</InformationLabel>
                        {index === 2 && (haberdasheryCard[input.info].includes("http") | haberdasheryCard[input.info].includes("www") | haberdasheryCard[input.info].includes(".fr") | haberdasheryCard[input.info].includes(".com") | haberdasheryCard[input.info].includes(".net")) ? (
                          <InformationLinkContainer
                          >
                            <InformationLink
                              href={haberdasheryCard[input.info].includes("http") ? haberdasheryCard[input.info] : `https://${haberdasheryCard[input.info]}`}
                              target="_blank"
                            >
                              {haberdasheryCard[input.info]}
                            </InformationLink>
                          </InformationLinkContainer>
                        ) : (
                          <InformationInput
                            value={haberdasheryCard[input.info]}
                            disabled="disabled"
                            type={input.type}
                          ></InformationInput>
                        )}

                      </InformationContent>
                    ) : null
                  )}
                </InformationForm>
              )}
              <ProjectContainer>
                <ProjectTitle>Projets avec cet article de mercerie</ProjectTitle>
                <ProjectImageContainer>
                  <ProjectImage src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                  <ProjectImage src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                  <ProjectImage src="http://react-responsive-carousel.js.org/assets/2.jpeg" />
                </ProjectImageContainer>
              </ProjectContainer>
            </InformationContainer>
          </CardContainer>
        </Container>
      )}
    </>
  );
};
