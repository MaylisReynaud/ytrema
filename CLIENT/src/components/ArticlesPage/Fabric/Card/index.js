import React, { useRef, useState, useEffect, useCallback } from "react";
import { storage } from "../../../../Firebase";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { DeviceSize } from "../../../Navbar/Responsive";
import {
  CardContainer,
  CardTitle,
  DesignerTitle,
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
  UpdateInformation,
  UpdateInformationContainer,
  UpdateInformationText,
  InputMessageHover,
} from "./style";
import { fabricData } from "../../../../utils/fabricData";
import { fabricInputs } from "../../../../utils/fabricInputs";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteOneFabricMutation,
  useUpdateOneFabricMutation,
} from "../../../../../src/store/api/ytremaApi";
import {
  updateFabric,
  deleteFabric,
} from "../../../../store/state/fabricSlice";
import { ErrorMessage } from "../Input/Input.style";
import { MessageHover } from "./MessageHover";

export const Card = (fabric, isOpenModal, setShowModal, showModal) => {
  const { id } = useParams();
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
  const cardRef = useRef();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const fabrics = persistedReducer.fabrics;
  const fabricCard = fabrics.value.find((fabric) => fabric.id == id);
  const [deleteOneFabric] = useDeleteOneFabricMutation(fabricCard.id, auth.id);
  const [updateOneFabric] = useUpdateOneFabricMutation(fabricCard.id, auth.id);
  const [updateFabricInfo, setUpdateFabricInfo] = useState(false);

  const deleteCard = () => {
    const urlParams = {
      memberId: auth.id,
      fabricId: fabricCard.id,
    };
    deleteOneFabric(urlParams);
    dispatch(deleteFabric(fabricCard.id));
    navigate("/tissus");
  };

  const [values, setValues] = useState({
    photo: fabricCard.photo,
    name: fabricCard.name,
    website: fabricCard.website,
    designer: fabricCard.designer,
    color: fabricCard.color,
    precise_color: fabricCard.precise_color,
    fabric: fabricCard.fabric,
    composition: fabricCard.composition,
    weight: fabricCard.weight,
    quantity: fabricCard.quantity,
    width: fabricCard.width,
    price: fabricCard.price,
  });

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    if (!selectedFile) {
      // setPreview(undefined);
      setPreview(fabricCard.photo);
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
    if (photoURL !== undefined) {
      values.photo = photoURL;
    }
    const valuesToSend = values;
    // valuesToSend.photo = photoURL;
    const urlParams = {
      memberId: auth.id,
      fabricId: fabricCard.id,
      body: valuesToSend,
    };

    const { updatedFabricData } = await updateOneFabric(urlParams).unwrap();

    //  Mettre à jour le store
    dispatch(updateFabric(updatedFabricData));
    setUpdateFabricInfo(false);
    // setPreview(undefined);
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

    if (event.target.name === "photo") {
      onSelectFile(event);
      if (!event.target.files || event.target.files.length > 0) {
        handleUpload(event.target.files[0]);
      }
    }
  };

  const updateCard = () => {
    setUpdateFabricInfo(true);
  };

  return (
    <>
      {isMobile && (
        <Container>
          <CardContainer>
            <ButtonsContainer>
              <ReturnArrowContainer>
                <ReturnArrow
                  aria-label="Retourner à la liste des tissus"
                  ref={cardRef}
                  onClick={() => {
                    navigate("/Tissus");
                  }}
                />
              </ReturnArrowContainer>
              <ModifyDeleteContainer>
                {!updateFabricInfo ? (
                  <>
                    <ModifyContainer>
                      <ModifyButton
                        aria-label="Modifier ce tissu"
                        onClick={updateCard}
                      />
                    </ModifyContainer>
                    <TrashContainer>
                      <TrashButton
                        aria-label="Supprimer ce tissu"
                        ref={cardRef}
                        onClick={deleteCard}
                      />
                    </TrashContainer>

                  </>
                ) : (
                  <UpdateInformationContainer
                    // animate={{ x: 20 }}
                    // transition={{ type: "spring", stiffness: 100 }}
                    initial={{x: '-80px' }} 
                    animate={{ x: 0 }} 
                    transition={{ type: "tween", stiffness: 1000, duration: 3 }}
                  >
                    <UpdateInformationText>
                      Tissu en cours de modification
                    </UpdateInformationText>

                  </UpdateInformationContainer>
                )}
              </ModifyDeleteContainer>
            </ButtonsContainer>

            <TitleContainer>
              <CardTitle>{fabricCard.name}</CardTitle>
              <DesignerTitle>{fabricCard.designer}</DesignerTitle>
            </TitleContainer>
            {!updateFabricInfo ? (
              <ImageContainer>
                <ImageCard src={fabricCard.photo} />
              </ImageContainer>
            ) : (
              <UpdateCardContainer>
                <UpdatePhotoInput>
                  <ImageCard src={preview} alt="fabric picture" />
                </UpdatePhotoInput>
                <div>
                  <input
                    name="photo"
                    accept="image/*"
                    placeholder="Photo du tissu"
                    required=""
                    type="file"
                    onChange={onChange}
                  ></input>
                </div>
              </UpdateCardContainer>
            )}
            <InformationContainer>
              {updateFabricInfo ? (
                <InformationForm onSubmit={handleSubmit}>
                  {fabricInputs.map((input, index) =>
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

                         
                         <MessageHover 
                            errorMessage={input.errorMessage}
                          />
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
                  {fabricInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        <InformationLabel>{input.label}</InformationLabel>
                        {index === 2 && (fabricCard[input.info].includes("http") | fabricCard[input.info].includes("www") | fabricCard[input.info].includes(".fr") | fabricCard[input.info].includes(".com") | fabricCard[input.info].includes(".net") ) ? (
                          <InformationLinkContainer
                          >
                            <InformationLink
                              href={fabricCard[input.info].includes("http") ? fabricCard[input.info] : `https://${fabricCard[input.info]}`}
                              target="_blank"
                            >
                              {fabricCard[input.info]}
                            </InformationLink>
                          </InformationLinkContainer>
                        ) : (
                          <InformationInput
                            value={fabricCard[input.info]}
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
                <ProjectTitle>Projets avec ce tissu</ProjectTitle>
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
                aria-label="Retourner à la liste des tissus"
                ref={cardRef}
                onClick={() => {
                  navigate("/Tissus");
                }}
              />
            </ReturnArrowContainer>
            <ModifyDeleteContainer>
              <ModifyButton
                aria-label="Modifier ce tissu"
              />
              <TrashButton
                aria-label="Supprimer ce tissu"
                ref={cardRef}
                onClick={deleteCard}
              />
            </ModifyDeleteContainer>
          </ButtonsContainer>
          <CardContainer>
            <ImageContainer>
              <ImageCard src={fabricCard.photo} />
            </ImageContainer>

            <InformationContainer>
              <TitleContainer>
                <CardTitle>
                  {fabricCard.name} - {fabricCard.designer}
                </CardTitle>
              </TitleContainer>
              <InformationForm>
                {fabricInputs.map((input, index) =>
                  index !== 0 ? (
                    <InformationContent>
                      <InformationLabel key={input.id}>
                        {input.label}
                      </InformationLabel>
                      <InformationInput
                        value={fabricCard[input.info]}
                        disabled="disabled"
                        type={input.type}
                      ></InformationInput>
                    </InformationContent>
                  ) : null
                )}
              </InformationForm>
              <ProjectContainer>
                <ProjectTitle>Projets avec ce tissu</ProjectTitle>
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
