import React, { useRef, useState, useEffect } from "react";
import { storage } from "../../../../Firebase";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { DeviceSize } from "../../../Navbar/Responsive";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  InformationTextarea,
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
  AddContainer,
  AddButton,
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
import { DeleteModal } from "../../../DeleteModal";

export const HaberdasheryCard = (
  haberdashery,
  isOpenModal,
  setShowModal,
  showModal
) => {
  const { id } = useParams();
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
  const cardRef = useRef();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const haberdasheries = persistedReducer.haberdasheries;
  const haberdasheryCard = haberdasheries.value.find(
    (haberdashery) => haberdashery.id == id
  );
  const [deleteOneHaberdashery] = useDeleteOneHaberdasheryMutation(
    haberdasheryCard.id,
    auth.id
  );
  const [updateOneHaberdashery] = useUpdateOneHaberdasheryMutation(
    haberdasheryCard.id,
    auth.id
  );
  const [updateHaberdasheryInfo, setUpdateHaberdasheryInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isOpenDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const deleteCard = () => {
    const urlParams = {
      memberId: auth.id,
      haberdasheryId: haberdasheryCard.id,
    };
    deleteOneHaberdashery(urlParams);
    dispatch(deleteHaberdashery(haberdasheryCard.id));
    setShowDeleteModal(!showDeleteModal);
    navigate("/mercerie");
    toast.success("Article de mercerie supprimé avec succès👌", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      role: "alert",
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
    stock_qty: haberdasheryCard.stock_qty,
    unity: haberdasheryCard.unity,
    is_cut: haberdasheryCard.is_cut,
    is_a_set: haberdasheryCard.is_a_set,
    article_qty: haberdasheryCard.article_qty,
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
    console.log(photoURL, "photoURL");
    if (photoURL !== undefined) {
      values.photo = photoURL;
    }
    if (values.is_cut == "oui") {
      values.is_cut = true;
    } else if (values.is_cut == "non") {
      values.is_cut = false;
    }

    if (values.is_a_set == "oui") {
      values.is_a_set = true;
    } else if (values.is_a_set == "non") {
      values.is_a_set = false;
    }

    const valuesToSend = values;
    console.log(valuesToSend, "valuestosend");
    const urlParams = {
      memberId: auth.id,
      haberdasheryId: haberdasheryCard.id,
      body: valuesToSend,
    };

    const { updatedHaberdasheryData } = await updateOneHaberdashery(
      urlParams
    ).unwrap();

    //  Mettre à jour le store
    dispatch(updateHaberdashery(updatedHaberdasheryData));
    setUpdateHaberdasheryInfo(false);
    toast.success("Article de mercerie modifié avec succès👌", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      role: "alert",
    });
  };

  //problem with is cut: always show true even if I put false
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
                    <AddContainer>
                      <AddButton
                        aria-label="Faire un réassort de cet article de mercerie"
                      />
                    </AddContainer>
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
                    <DeleteModal
                      setShowDeleteModal={setShowDeleteModal}
                      showDeleteModal={showDeleteModal}
                      deleteAction={deleteCard}
                      word={"SUPPRIMER CET ARTICLE"}
                    />
                  </>
                ) : (
                  <UpdateInformationContainer
                    // animate={{ x: 20 }}
                    // transition={{ type: "spring", stiffness: 100 }}
                    initial={{ x: "-80px" }}
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
              <SizeTitle>
                {haberdasheryCard.size}
                {haberdasheryCard.unity}
              </SizeTitle>
            </TitleContainer>
            {/* DISPLAY PHOTO */}
            {!updateHaberdasheryInfo ? (
              <ImageContainer>
                <ImageCard src={haberdasheryCard.photo} />
              </ImageContainer>
            ) : (
              // UPDATE PHOTO
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
              {/* UPDATE */}
              {updateHaberdasheryInfo ? (
                <InformationForm onSubmit={handleSubmit}>
                  {haberdasheryInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        {input.type == "select" ? (
                          <>
                            <InformationLabel htmlFor={input.htmlFor}>
                              {input.label}
                            </InformationLabel>
                            {/* SOIT SELECT NORMAL ID 4 10 11 */}
                            {input.id == 4 || input.id == 10 || input.id == 11 ? (
                              <InformationSelect
                                placeholder={values[input.info]}
                                onChange={onChange}
                                name={input.name}
                                type={input.type}
                                id={input.htmlFor}
                                defaultValue={values[input.info]}
                              >
                                {input.optionsList.sort().map((option, index) =>
                                  option == values[input.info] ? (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ) : (
                                    <option
                                      key={index}
                                      value={
                                        option == "false"
                                          ? "non"
                                          : option == "true"
                                            ? "oui"
                                            : option
                                      }
                                    >
                                      {option == "false"
                                        ? "non"
                                        : option == "true"
                                          ? "oui"
                                          : option}
                                    </option>
                                  )
                                )}
                              </InformationSelect>
                            ) :
                              // SOIT SELECT DISABLED ID 5 ET 6
                              (
                                <InformationSelect
                                  disabled
                                  className="disabled"
                                  name={input.name}
                                  type={input.type}
                                  id={input.htmlFor}
                                  defaultValue={
                                    values[input.info] == false
                                      ? "non"
                                      : values[input.info] == true
                                        ? "oui"
                                        : values[input.info]
                                  }
                                >
                                  {input.optionsList.sort().map((option, index) =>
                                    option == values[input.info] ? (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ) : (
                                      <option
                                        key={index}
                                        value={
                                          option == "false"
                                            ? "non"
                                            : option == "true"
                                              ? "oui"
                                              : option
                                        }
                                      >
                                        {option == "false"
                                          ? "non"
                                          : option == "true"
                                            ? "oui"
                                            : option}
                                      </option>
                                    )
                                  )}
                                </InformationSelect>
                              )}
                          </>
                        ) :
                          // SINON CE N'EST PAS UN SELECT
                          (
                            //CAS GENERAL TEXTAREA
                            input.id !== 7 && input.id !== 8 && input.id !== 9 && input.id !== 13 ? (
                              <>
                                <InformationLabel htmlFor={input.htmlFor}>
                                  {input.label}
                                </InformationLabel>
                                <InformationTextarea
                                  placeholder={values[input.info]}
                                  rows={
                                    values[input.info].length <= 31 ? "1" : "2"
                                  }
                                  onChange={onChange}
                                  type={input.type}
                                  name={input.name}
                                  pattern={input.pattern}
                                  data-error={input.errorMessage}
                                ></InformationTextarea>
                              </>
                            ) :
                              // CAS SPECIFIQUES INPUT
                              (
                                // SOIT IS_A_SET == TRUE (CAS 2)
                                values.is_a_set == true ? (
                                  //SOIT LABEL NORMAL
                                  input.id == 7 || input.id == 9 ? (
                                    <>
                                      <InformationLabel htmlFor={input.htmlFor}>
                                        {input.label}
                                      </InformationLabel>
                                      <InformationInput
                                        placeholder={values[input.info]}
                                        onChange={onChange}
                                        type={input.type}
                                        name={input.name}
                                        pattern={input.pattern}
                                        data-error={input.errorMessage}
                                      ></InformationInput>
                                    </>
                                  ) :
                                    // SOIT INPUT.ID == 13 : LABEL SPE "Prix du lot" SINON INPUT.ID == 8 : LABEL SPE "Quantité stockée"
                                    (
                                      <>
                                        <InformationLabel htmlFor={input.htmlFor}>
                                          {input.id == 13 ? input.labelSpe2 : input.labelSpe}
                                        </InformationLabel>
                                        <InformationInput
                                          placeholder={values[input.info]}
                                          onChange={onChange}
                                          type={input.type}
                                          name={input.name}
                                          pattern={input.pattern}
                                          data-error={input.errorMessage}
                                        ></InformationInput>
                                      </>
                                    )
                                ) :
                                  // SINON IS_A_SET == FALSE
                                  (
                                    values.is_a_set == false ? (
                                      //SOIT ID == 8 || ID == 9 || ID == 13 CAS 1 OU 3
                                      input.id == 8 || input.id == 9 || input.id == 13 ? (
                                        // SOIT ID == 8 || ID == 13 / LABEL DEVIENT "Quantité stockée" ET "prix à l'unité"
                                        input.id == 8 || input.id == 13 ? (
                                          <>
                                            <InformationLabel htmlFor={input.htmlFor}>
                                              {input.labelSpe}
                                            </InformationLabel>
                                            <InformationInput
                                              placeholder={values[input.info]}
                                              onChange={onChange}
                                              type={input.type}
                                              name={input.name}
                                              pattern={input.pattern}
                                              data-error={input.errorMessage}
                                            ></InformationInput>
                                          </>
                                        ) :
                                          (
                                            //ID == 9
                                            //SOIT IS_CUT == true
                                            values.is_cut == true ? (
                                              <>
                                                <InformationLabel htmlFor={input.htmlFor}>
                                                  {input.labelSpe}
                                                </InformationLabel>
                                                <InformationInput
                                                  placeholder={values[input.info]}
                                                  onChange={onChange}
                                                  type={input.type}
                                                  name={input.name}
                                                  pattern={input.pattern}
                                                  data-error={input.errorMessage}
                                                ></InformationInput>
                                              </>
                                            ) : (
                                              // DISPLAY CHAMPS NORMAL CAS 1
                                              <>
                                                <InformationLabel htmlFor={input.htmlFor}>
                                                  {input.label}
                                                </InformationLabel>
                                                <InformationInput
                                                  placeholder={values[input.info]}
                                                  onChange={onChange}
                                                  type={input.type}
                                                  name={input.name}
                                                  pattern={input.pattern}
                                                  data-error={input.errorMessage}
                                                ></InformationInput>
                                              </>
                                            )
                                          )

                                      ) : (

                                        null)

                                    ) :
                                      (null)
                                  )

                              )
                          )}
                      </InformationContent>
                    ) : null
                  )}
                  <ButtonForm>Enregistrer</ButtonForm>
                </InformationForm>
              ) : (
                // DISPLAY
                <InformationForm>
                  {haberdasheryInputs.map((input, index) =>
                    // SOIT LE CHAMP EST DIFFERENT DU CHAMP PHOTO
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        {/* SOIT LE CHAMP EST WEBSITE */}
                        {/* SOIT WEBSITE EST UNE URL DONC LINK */}
                        {index == 2 ? (
                          haberdasheryCard[input.info].includes("http") |
                            haberdasheryCard[input.info].includes("www") |
                            haberdasheryCard[input.info].includes(".fr") |
                            haberdasheryCard[input.info].includes(".com") |
                            haberdasheryCard[input.info].includes(".net") ? (
                            <>
                              <InformationLabel>{input.label}</InformationLabel>
                              <InformationLinkContainer>
                                <InformationLink
                                  href={
                                    haberdasheryCard[input.info].includes(
                                      "http"
                                    )
                                      ? haberdasheryCard[input.info]
                                      : `https://${haberdasheryCard[input.info]
                                      }`
                                  }
                                  target="_blank"
                                >
                                  {haberdasheryCard[input.info]}
                                </InformationLink>
                              </InformationLinkContainer>
                            </>
                          ) : (
                            // SINON WEBSITE N'EST PAS UNE URL
                            <>
                              <InformationLabel>{input.label}</InformationLabel>
                              <InformationTextarea
                                value={
                                  haberdasheryCard[input.info] === false
                                    ? "non"
                                    : haberdasheryCard[input.info] === true
                                      ? "oui"
                                      : haberdasheryCard[input.info]
                                }
                                rows={
                                  values[input.info].length <= 31 ? "1" : "2"
                                }
                                disabled="disabled"
                                type={input.type}
                              ></InformationTextarea>
                            </>
                          )
                        ) : // SINON LE CHAMP EST DIFFERENT DE WEBSITE
                          // SOIT CAS GENERAL (ID 2, 4, 5, 6, 10, 11 & 12)
                          input.id !== 7 &&
                            input.id !== 8 &&
                            input.id !== 9 &&
                            input.id !== 13 ? (
                            // ON AFFICHE PEU IMPORTE LE CAS
                            <>
                              <InformationLabel>{input.label}</InformationLabel>
                              <InformationTextarea
                                value={
                                  haberdasheryCard[input.info] === false
                                    ? "non"
                                    : haberdasheryCard[input.info] === true
                                      ? "oui"
                                      : haberdasheryCard[input.info]
                                }
                                rows={values[input.info].length <= 31 ? "1" : "2"}
                                disabled="disabled"
                                type={input.type}
                              ></InformationTextarea>
                            </>
                          ) : // SINON CAS SPECIFIQUE (ID 7, 8, 9, 13) ON DETAILLE CAS PAR CAS
                            // SOIT LE CHAMP EST STOCK_QTY ID 8
                            input.id == 8 ? (
                              // QUELQUE SOIT LE CAS ON MODIFIE LE LABEL
                              <>
                                <InformationLabel>
                                  {input.labelSpe}
                                </InformationLabel>
                                <InformationTextarea
                                  value={
                                    haberdasheryCard[input.info] === false
                                      ? "non"
                                      : haberdasheryCard[input.info] === true
                                        ? "oui"
                                        : haberdasheryCard[input.info]
                                  }
                                  rows={values[input.info].length <= 31 ? "1" : "2"}
                                  disabled="disabled"
                                  type={input.type}
                                ></InformationTextarea>
                              </>
                            ) : // SINON C'EST ID 7, 9 OU 13 ON REGARDE SI C'EST LE CAS 2 OU PAS
                              values.is_a_set == true ? (
                                // SOIT IS A SET EST TRUE CAS 2
                                // SOIT CAS 2 ET ID 7 OU 9 AFFICHAGE NORMAL
                                input.id !== 13 ? (
                                  <>
                                    <InformationLabel>{input.label}</InformationLabel>
                                    <InformationTextarea
                                      value={
                                        haberdasheryCard[input.info] === false
                                          ? "non"
                                          : haberdasheryCard[input.info] === true
                                            ? "oui"
                                            : haberdasheryCard[input.info]
                                      }
                                      rows={
                                        values[input.info].length <= 31 ? "1" : "2"
                                      }
                                      disabled="disabled"
                                      type={input.type}
                                    ></InformationTextarea>
                                  </>
                                ) : (
                                  // SINON CAS 2 ET ID 13 ON MODIFIE LE LABEL
                                  <>
                                    <InformationLabel>
                                      {input.labelSpe2}
                                    </InformationLabel>
                                    <InformationTextarea
                                      value={
                                        haberdasheryCard[input.info] === false
                                          ? "non"
                                          : haberdasheryCard[input.info] === true
                                            ? "oui"
                                            : haberdasheryCard[input.info]
                                      }
                                      rows={
                                        values[input.info].length <= 31 ? "1" : "2"
                                      }
                                      disabled="disabled"
                                      type={input.type}
                                    ></InformationTextarea>
                                  </>
                                )
                              ) : // SINON IS A SET EST FALSE CAS 1 ET 3 ON REGARDE SI L'ID EST DIFFERENT DU 7 OU PAS
                                input.id !== 7 ? (
                                  // SOIT C'EST ID 13 OU 9 ON TRAITE LES IDS SEPAREMENT
                                  input.id == 13 ? (
                                    // SOIT ID EST 13 PEU IMPORTE CAS 1 OU 3 ON MODIFIE LE LABEL
                                    <>
                                      <InformationLabel>
                                        {input.labelSpe}
                                      </InformationLabel>
                                      <InformationTextarea
                                        value={
                                          haberdasheryCard[input.info] === false
                                            ? "non"
                                            : haberdasheryCard[input.info] === true
                                              ? "oui"
                                              : haberdasheryCard[input.info]
                                        }
                                        rows={
                                          values[input.info].length <= 31 ? "1" : "2"
                                        }
                                        disabled="disabled"
                                        type={input.type}
                                      ></InformationTextarea>
                                    </>
                                  ) : // SINON C'EST ID 9 ET ON ISOLE LE CAS 3
                                    values.is_cut == true ? (
                                      // SOIT IS CUT EST TRUE CAS 3
                                      <>
                                        <InformationLabel>
                                          {input.labelSpe}
                                        </InformationLabel>
                                        <InformationTextarea
                                          value={
                                            haberdasheryCard[input.info] === false
                                              ? "non"
                                              : haberdasheryCard[input.info] === true
                                                ? "oui"
                                                : haberdasheryCard[input.info]
                                          }
                                          rows={
                                            values[input.info].length <= 31 ? "1" : "2"
                                          }
                                          disabled="disabled"
                                          type={input.type}
                                        ></InformationTextarea>
                                      </>
                                    ) : (
                                      // SINON IS CUT EST FALSE CAS 1 AFFICHAGE NORMAL
                                      <>
                                        <InformationLabel>{input.label}</InformationLabel>
                                        <InformationTextarea
                                          value={
                                            haberdasheryCard[input.info] === false
                                              ? "non"
                                              : haberdasheryCard[input.info] === true
                                                ? "oui"
                                                : haberdasheryCard[input.info]
                                          }
                                          rows={
                                            values[input.info].length <= 31 ? "1" : "2"
                                          }
                                          disabled="disabled"
                                          type={input.type}
                                        ></InformationTextarea>
                                      </>
                                    )
                                ) : // SINON C'EST ID 7 ON NE L'AFFICHE PAS
                                  null}
                      </InformationContent>
                    ) : // SINON IL S'AGIT DU CHAMP PHOTO
                      null
                  )}
                </InformationForm>
              )}

              <ProjectContainer>
                <ProjectTitle>
                  Projets avec cet article de mercerie
                </ProjectTitle>
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
                  <AddContainer>
                    <AddButton
                      aria-label="Faire un réassort de cet article de mercerie"
                    />
                  </AddContainer>
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
                  <DeleteModal
                    setShowDeleteModal={setShowDeleteModal}
                    showDeleteModal={showDeleteModal}
                    deleteAction={deleteCard}
                    word={" SUPPRIMER CET ARTICLE"}
                  />
                </>
              ) : (
                <UpdateInformationContainer
                  initial={{ x: "-80px" }}
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
                  {haberdasheryCard.name} - {haberdasheryCard.size}{" "}
                  {haberdasheryCard.unity}
                </CardTitle>
              </TitleContainer>
              {/* UPDATE */}
              {updateHaberdasheryInfo ? (
                <InformationForm onSubmit={handleSubmit}>
                  {haberdasheryInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        {input.type == "select" ? (
                          <>
                            <InformationLabel htmlFor={input.htmlFor}>
                              {input.label}
                            </InformationLabel>
                            {/* SOIT SELECT NORMAL ID 4 10 11 */}
                            {input.id == 4 || input.id == 10 || input.id == 11 ? (
                              <InformationSelect
                                placeholder={values[input.info]}
                                onChange={onChange}
                                name={input.name}
                                type={input.type}
                                id={input.htmlFor}
                                defaultValue={values[input.info]}
                              >
                                {input.optionsList.sort().map((option, index) =>
                                  option == values[input.info] ? (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ) : (
                                    <option
                                      key={index}
                                      value={
                                        option == "false"
                                          ? "non"
                                          : option == "true"
                                            ? "oui"
                                            : option
                                      }
                                    >
                                      {option == "false"
                                        ? "non"
                                        : option == "true"
                                          ? "oui"
                                          : option}
                                    </option>
                                  )
                                )}
                              </InformationSelect>
                            ) :
                              // SOIT SELECT DISABLED ID 5 ET 6
                              (
                                <InformationSelect
                                  disabled
                                  className="disabled"
                                  name={input.name}
                                  type={input.type}
                                  id={input.htmlFor}
                                  defaultValue={
                                    values[input.info] == false
                                      ? "non"
                                      : values[input.info] == true
                                        ? "oui"
                                        : values[input.info]
                                  }
                                >
                                  {input.optionsList.sort().map((option, index) =>
                                    option == values[input.info] ? (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ) : (
                                      <option
                                        key={index}
                                        value={
                                          option == "false"
                                            ? "non"
                                            : option == "true"
                                              ? "oui"
                                              : option
                                        }
                                      >
                                        {option == "false"
                                          ? "non"
                                          : option == "true"
                                            ? "oui"
                                            : option}
                                      </option>
                                    )
                                  )}
                                </InformationSelect>
                              )}
                          </>
                        ) :
                          // SINON CE N'EST PAS UN SELECT
                          (
                            //CAS GENERAL TEXTAREA
                            input.id !== 7 && input.id !== 8 && input.id !== 9 && input.id !== 13 ? (
                              <>
                                <InformationLabel htmlFor={input.htmlFor}>
                                  {input.label}
                                </InformationLabel>
                                <InformationTextarea
                                  placeholder={values[input.info]}
                                  rows={
                                    values[input.info].length <= 31 ? "1" : "2"
                                  }
                                  onChange={onChange}
                                  type={input.type}
                                  name={input.name}
                                  pattern={input.pattern}
                                  data-error={input.errorMessage}
                                ></InformationTextarea>
                              </>
                            ) :
                              // CAS SPECIFIQUES INPUT
                              (
                                // SOIT IS_A_SET == TRUE (CAS 2)
                                values.is_a_set == true ? (
                                  //SOIT LABEL NORMAL
                                  input.id == 7 || input.id == 9 ? (
                                    <>
                                      <InformationLabel htmlFor={input.htmlFor}>
                                        {input.label}
                                      </InformationLabel>
                                      <InformationInput
                                        placeholder={values[input.info]}
                                        onChange={onChange}
                                        type={input.type}
                                        name={input.name}
                                        pattern={input.pattern}
                                        data-error={input.errorMessage}
                                      ></InformationInput>
                                    </>
                                  ) :
                                    // SOIT INPUT.ID == 13 : LABEL SPE "Prix du lot" SINON INPUT.ID == 8 : LABEL SPE "Quantité stockée"
                                    (
                                      <>
                                        <InformationLabel htmlFor={input.htmlFor}>
                                          {input.id == 13 ? input.labelSpe2 : input.labelSpe}
                                        </InformationLabel>
                                        <InformationInput
                                          placeholder={values[input.info]}
                                          onChange={onChange}
                                          type={input.type}
                                          name={input.name}
                                          pattern={input.pattern}
                                          data-error={input.errorMessage}
                                        ></InformationInput>
                                      </>
                                    )
                                ) :
                                  // SINON IS_A_SET == FALSE
                                  (
                                    values.is_a_set == false ? (
                                      //SOIT ID == 8 || ID == 9 || ID == 13 CAS 1 OU 3
                                      input.id == 8 || input.id == 9 || input.id == 13 ? (
                                        // SOIT ID == 8 || ID == 13 / LABEL DEVIENT "Quantité stockée" ET "prix à l'unité"
                                        input.id == 8 || input.id == 13 ? (
                                          <>
                                            <InformationLabel htmlFor={input.htmlFor}>
                                              {input.labelSpe}
                                            </InformationLabel>
                                            <InformationInput
                                              placeholder={values[input.info]}
                                              onChange={onChange}
                                              type={input.type}
                                              name={input.name}
                                              pattern={input.pattern}
                                              data-error={input.errorMessage}
                                            ></InformationInput>
                                          </>
                                        ) :
                                          (
                                            //ID == 9
                                            //SOIT IS_CUT == true
                                            values.is_cut == true ? (
                                              <>
                                                <InformationLabel htmlFor={input.htmlFor}>
                                                  {input.labelSpe}
                                                </InformationLabel>
                                                <InformationInput
                                                  placeholder={values[input.info]}
                                                  onChange={onChange}
                                                  type={input.type}
                                                  name={input.name}
                                                  pattern={input.pattern}
                                                  data-error={input.errorMessage}
                                                ></InformationInput>
                                              </>
                                            ) : (
                                              // DISPLAY CHAMPS NORMAL CAS 1
                                              <>
                                                <InformationLabel htmlFor={input.htmlFor}>
                                                  {input.label}
                                                </InformationLabel>
                                                <InformationInput
                                                  placeholder={values[input.info]}
                                                  onChange={onChange}
                                                  type={input.type}
                                                  name={input.name}
                                                  pattern={input.pattern}
                                                  data-error={input.errorMessage}
                                                ></InformationInput>
                                              </>
                                            )
                                          )

                                      ) : (

                                        null)

                                    ) :
                                      (null)
                                  )

                              )
                          )}
                      </InformationContent>
                    ) : null
                  )}
                  <ButtonForm>Enregistrer</ButtonForm>
                </InformationForm>
              ) : (
                // DISPLAY
                <InformationForm>
                  {haberdasheryInputs.map((input, index) =>
                    // SOIT LE CHAMP EST DIFFERENT DU CHAMP PHOTO
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        {/* SOIT LE CHAMP EST WEBSITE */}
                        {/* SOIT WEBSITE EST UNE URL DONC LINK */}
                        {index == 2 ? (
                          haberdasheryCard[input.info].includes("http") |
                            haberdasheryCard[input.info].includes("www") |
                            haberdasheryCard[input.info].includes(".fr") |
                            haberdasheryCard[input.info].includes(".com") |
                            haberdasheryCard[input.info].includes(".net") ? (
                            <>
                              <InformationLabel>{input.label}</InformationLabel>
                              <InformationLinkContainer>
                                <InformationLink
                                  href={
                                    haberdasheryCard[input.info].includes(
                                      "http"
                                    )
                                      ? haberdasheryCard[input.info]
                                      : `https://${haberdasheryCard[input.info]
                                      }`
                                  }
                                  target="_blank"
                                >
                                  {haberdasheryCard[input.info]}
                                </InformationLink>
                              </InformationLinkContainer>
                            </>
                          ) : (
                            // SINON WEBSITE N'EST PAS UNE URL
                            <>
                              <InformationLabel>{input.label}</InformationLabel>
                              <InformationTextarea
                                value={
                                  haberdasheryCard[input.info] === false
                                    ? "non"
                                    : haberdasheryCard[input.info] === true
                                      ? "oui"
                                      : haberdasheryCard[input.info]
                                }
                                rows={
                                  values[input.info].length <= 31 ? "1" : "2"
                                }
                                disabled="disabled"
                                type={input.type}
                              ></InformationTextarea>
                            </>
                          )
                        ) : // SINON LE CHAMP EST DIFFERENT DE WEBSITE
                          // SOIT CAS GENERAL (ID 2, 4, 5, 6, 10, 11 & 12)
                          input.id !== 7 &&
                            input.id !== 8 &&
                            input.id !== 9 &&
                            input.id !== 13 ? (
                            // ON AFFICHE PEU IMPORTE LE CAS
                            <>
                              <InformationLabel>{input.label}</InformationLabel>
                              <InformationTextarea
                                value={
                                  haberdasheryCard[input.info] === false
                                    ? "non"
                                    : haberdasheryCard[input.info] === true
                                      ? "oui"
                                      : haberdasheryCard[input.info]
                                }
                                rows={values[input.info].length <= 31 ? "1" : "2"}
                                disabled="disabled"
                                type={input.type}
                              ></InformationTextarea>
                            </>
                          ) : // SINON CAS SPECIFIQUE (ID 7, 8, 9, 13) ON DETAILLE CAS PAR CAS
                            // SOIT LE CHAMP EST STOCK_QTY ID 8
                            input.id == 8 ? (
                              // QUELQUE SOIT LE CAS ON MODIFIE LE LABEL
                              <>
                                <InformationLabel>
                                  {input.labelSpe}
                                </InformationLabel>
                                <InformationTextarea
                                  value={
                                    haberdasheryCard[input.info] === false
                                      ? "non"
                                      : haberdasheryCard[input.info] === true
                                        ? "oui"
                                        : haberdasheryCard[input.info]
                                  }
                                  rows={values[input.info].length <= 31 ? "1" : "2"}
                                  disabled="disabled"
                                  type={input.type}
                                ></InformationTextarea>
                              </>
                            ) : // SINON C'EST ID 7, 9 OU 13 ON REGARDE SI C'EST LE CAS 2 OU PAS
                              values.is_a_set == true ? (
                                // SOIT IS A SET EST TRUE CAS 2
                                // SOIT CAS 2 ET ID 7 OU 9 AFFICHAGE NORMAL
                                input.id !== 13 ? (
                                  <>
                                    <InformationLabel>{input.label}</InformationLabel>
                                    <InformationTextarea
                                      value={
                                        haberdasheryCard[input.info] === false
                                          ? "non"
                                          : haberdasheryCard[input.info] === true
                                            ? "oui"
                                            : haberdasheryCard[input.info]
                                      }
                                      rows={
                                        values[input.info].length <= 31 ? "1" : "2"
                                      }
                                      disabled="disabled"
                                      type={input.type}
                                    ></InformationTextarea>
                                  </>
                                ) : (
                                  // SINON CAS 2 ET ID 13 ON MODIFIE LE LABEL
                                  <>
                                    <InformationLabel>
                                      {input.labelSpe2}
                                    </InformationLabel>
                                    <InformationTextarea
                                      value={
                                        haberdasheryCard[input.info] === false
                                          ? "non"
                                          : haberdasheryCard[input.info] === true
                                            ? "oui"
                                            : haberdasheryCard[input.info]
                                      }
                                      rows={
                                        values[input.info].length <= 31 ? "1" : "2"
                                      }
                                      disabled="disabled"
                                      type={input.type}
                                    ></InformationTextarea>
                                  </>
                                )
                              ) : // SINON IS A SET EST FALSE CAS 1 ET 3 ON REGARDE SI L'ID EST DIFFERENT DU 7 OU PAS
                                input.id !== 7 ? (
                                  // SOIT C'EST ID 13 OU 9 ON TRAITE LES IDS SEPAREMENT
                                  input.id == 13 ? (
                                    // SOIT ID EST 13 PEU IMPORTE CAS 1 OU 3 ON MODIFIE LE LABEL
                                    <>
                                      <InformationLabel>
                                        {input.labelSpe}
                                      </InformationLabel>
                                      <InformationTextarea
                                        value={
                                          haberdasheryCard[input.info] === false
                                            ? "non"
                                            : haberdasheryCard[input.info] === true
                                              ? "oui"
                                              : haberdasheryCard[input.info]
                                        }
                                        rows={
                                          values[input.info].length <= 31 ? "1" : "2"
                                        }
                                        disabled="disabled"
                                        type={input.type}
                                      ></InformationTextarea>
                                    </>
                                  ) : // SINON C'EST ID 9 ET ON ISOLE LE CAS 3
                                    values.is_cut == true ? (
                                      // SOIT IS CUT EST TRUE CAS 3
                                      <>
                                        <InformationLabel>
                                          {input.labelSpe}
                                        </InformationLabel>
                                        <InformationTextarea
                                          value={
                                            haberdasheryCard[input.info] === false
                                              ? "non"
                                              : haberdasheryCard[input.info] === true
                                                ? "oui"
                                                : haberdasheryCard[input.info]
                                          }
                                          rows={
                                            values[input.info].length <= 31 ? "1" : "2"
                                          }
                                          disabled="disabled"
                                          type={input.type}
                                        ></InformationTextarea>
                                      </>
                                    ) : (
                                      // SINON IS CUT EST FALSE CAS 1 AFFICHAGE NORMAL
                                      <>
                                        <InformationLabel>{input.label}</InformationLabel>
                                        <InformationTextarea
                                          value={
                                            haberdasheryCard[input.info] === false
                                              ? "non"
                                              : haberdasheryCard[input.info] === true
                                                ? "oui"
                                                : haberdasheryCard[input.info]
                                          }
                                          rows={
                                            values[input.info].length <= 31 ? "1" : "2"
                                          }
                                          disabled="disabled"
                                          type={input.type}
                                        ></InformationTextarea>
                                      </>
                                    )
                                ) : // SINON C'EST ID 7 ON NE L'AFFICHE PAS
                                  null}
                      </InformationContent>
                    ) : // SINON IL S'AGIT DU CHAMP PHOTO
                      null
                  )}
                </InformationForm>
              )}
              <ProjectContainer>
                <ProjectTitle>
                  Projets avec cet article de mercerie
                </ProjectTitle>
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
