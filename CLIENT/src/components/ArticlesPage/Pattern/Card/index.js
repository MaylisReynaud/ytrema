import React, { useRef, useState, useEffect } from "react";
import { storage } from "../../../../Firebase";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { DeviceSize } from "../../../Navbar/Responsive";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  UpdateInformationContainer,
  UpdateInformationText,
  UpdateFileInputContainer,
  PdfContainer,
  PdfIframe,
  PatternPreviewTitle,
  PreviewContainer,
  UpdateImageCard
} from "./style";
import { fabricData } from "../../../../utils/fabricData";
import { patternInputs } from "../../../../utils/patternInputs";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteOnePatternMutation,
  useUpdateOnePatternMutation,
} from "../../../../../src/store/api/ytremaApi";
import {
  updatePattern,
  deletePattern,
} from "../../../../store/state/patternSlice";
import { MessageHover } from "./MessageHover";
import { DeletePatternModal } from "./DeleteModal";

export const PatternCard = (pattern, isOpenModal, setShowModal, showModal) => {
  const { id } = useParams();
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
  const cardRef = useRef();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  const auth = persistedReducer.auth;
  const patterns = persistedReducer.patterns;
  const patternCard = patterns.value.find((pattern) => pattern.id == id);
  const [deleteOnePattern] = useDeleteOnePatternMutation(patternCard.id, auth.id);
  const [updateOnePattern] = useUpdateOnePatternMutation(patternCard.id, auth.id);
  const [updatePatternInfo, setUpdatePatternInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isOpenDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  }

  const deleteCard = () => {
    const urlParams = {
      memberId: auth.id,
      patternId: patternCard.id,
    };
    deleteOnePattern(urlParams);
    dispatch(deletePattern(patternCard.id));
    setShowDeleteModal(!showDeleteModal);
    navigate("/patrons");
    toast.success('Patron supprimé avec succès👌', {
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
    photo: patternCard.photo,
    name: patternCard.name,
    website: patternCard.website,
    brand: patternCard.brand,
    clothing: patternCard.clothing,
    gender: patternCard.gender,
    personal_notes: patternCard.personal_notes,
    format: patternCard.format,
    pdf_instructions: patternCard.pdf_instructions,
    price: patternCard.price,
  });

  const [selectedFile, setSelectedFile] = useState();
  const [selectedPdf, setSelectedPdf] = useState();
  const [preview, setPreview] = useState();
  const [pdfPreview, setPdfPreview] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [pdfURL, setPdfURL] = useState();

  useEffect(() => {
    if (!selectedFile) {
      // setPreview(undefined);
      setPreview(patternCard.photo);
      return;
    } else if (!selectedPdf) {
      setPdfPreview(patternCard.pdf_instructions);
    }

    const objectUrlPdf = URL.createObjectURL(selectedPdf);
    setPdfPreview(objectUrlPdf);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
      URL.revokeObjectURL(objectUrlPdf)
    }

      ;
  }, [selectedFile, selectedPdf]);

  const onSelectFile = async (event, type) => {
    if (!event.target.files || event.target.files.length === 0) {

      type === "photo" ?
        setSelectedFile(undefined) :
        setSelectedPdf(undefined);

      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    type === "photo" ?
      setSelectedFile(event.target.files[0]) :
      setSelectedPdf(event.target.files[0]);
  };

  //propre a firebase
  const handleUpload = async (file, type) => {
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
            console.log(url, "URL FIREBASE");
            type === "photo" ?
              setPhotoURL(url) : setPdfURL(url);
          });
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (photoURL !== undefined) {
      values.photo = photoURL;
    }

    if (pdfURL !== undefined) {
      values.pdf_instructions = pdfURL;
    }

    const valuesToSend = values;
    // valuesToSend.photo = photoURL;
    const urlParams = {
      memberId: auth.id,
      patternId: patternCard.id,
      body: valuesToSend,
    };

    const { updatedPatternData } = await updateOnePattern(urlParams).unwrap();

    //  Mettre à jour le store
    dispatch(updatePattern(updatedPatternData));
    setUpdatePatternInfo(false);
    toast.success('Patron modifié avec succès👌', {
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
    // setPreview(undefined);
  };

  const onChange = async (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });

    if (event.target.name === "photo" || event.target.name === "pdf_instructions") {

      event.target.name === "photo" ? onSelectFile(event, "photo") : onSelectFile(event, "pdf");

      if (!event.target.files || event.target.files.length > 0) {

        event.target.name === "photo" ?
          handleUpload(event.target.files[0], "photo") : handleUpload(event.target.files[0], "pdf");
      }
    }
  };

  const updateCard = () => {
    setUpdatePatternInfo(true);
  };

  return (
    <>
      {isMobile && (
        <Container>
          <CardContainer>
            <ButtonsContainer>
              <ReturnArrowContainer>
                <ReturnArrow
                  aria-label="Retourner à la liste des patrons"
                  ref={cardRef}
                  onClick={() => {
                    navigate("/patrons");
                  }}

                />
              </ReturnArrowContainer>
              <ModifyDeleteContainer>
                {!updatePatternInfo ? (
                  <>
                    <ModifyContainer>
                      <ModifyButton
                        aria-label="Modifier ce patron"
                        onClick={updateCard}
                      />
                    </ModifyContainer>
                    <TrashContainer>
                      <TrashButton
                        aria-label="Supprimer ce patron"
                        ref={cardRef}
                        onClick={isOpenDeleteModal}
                      />
                    </TrashContainer>
                    <DeletePatternModal
                      setShowDeleteModal={setShowDeleteModal}
                      showDeleteModal={showDeleteModal}
                      deleteCard={deleteCard}
                    />
                  </>
                ) : (
                  <UpdateInformationContainer
                    initial={{ x: '-80px' }}
                    animate={{ x: 0 }}
                    transition={{ type: "linear" }}
                  >
                    <UpdateInformationText>
                      Patron en cours de modification
                    </UpdateInformationText>

                  </UpdateInformationContainer>
                )}
              </ModifyDeleteContainer>
            </ButtonsContainer>

            <TitleContainer>
              <CardTitle>{patternCard.name}</CardTitle>
              <DesignerTitle>{patternCard.brand}</DesignerTitle>
            </TitleContainer>
            {!updatePatternInfo ? (
              <>
                <ImageContainer>
                  <ImageCard src={patternCard.photo} />
                </ImageContainer>
                <PreviewContainer>
                  <PatternPreviewTitle>Prévisualisation du patron</PatternPreviewTitle>
                  <PdfIframe src={patternCard.pdf_instructions}></PdfIframe>
                </PreviewContainer>

                <PdfContainer>
                  <InformationLabel>Lien du patron</InformationLabel>
                  <InformationLinkContainer>
                    <InformationLink
                      href={patternCard.pdf_instructions} target="_blank"
                    >
                      Cliquez ici pour visualiser le patron
                    </InformationLink>
                  </InformationLinkContainer>


                </PdfContainer>

              </>
            ) : (
              <UpdateCardContainer>
                <UpdatePhotoInput>
                  <ImageCard src={preview} alt="pattern picture" />
                </UpdatePhotoInput>
                <div>
                  <input
                    name="photo"
                    accept="image/*"
                    placeholder="Photo du patron"
                    required=""
                    type="file"
                    onChange={onChange}
                  ></input>
                </div>
                {/* PDF */}
                <PreviewContainer>
                  <PatternPreviewTitle>Prévisualisation du patron</PatternPreviewTitle>
                  <UpdatePhotoInput>
                    <PdfIframe src={patternCard.pdf_instructions}  ></PdfIframe>
                  </UpdatePhotoInput>
                  <UpdateFileInputContainer>
                  <input
                    name="pdf_instructions"
                    accept="image/*, .pdf, .doc"
                    placeholder="Photo du patron"
                    required=""
                    type="file"
                    onChange={onChange}
                  ></input>
                </UpdateFileInputContainer>
                </PreviewContainer>

              </UpdateCardContainer>
            )}
            <InformationContainer>
              
              {updatePatternInfo ? (
                <InformationForm onSubmit={handleSubmit}>
                  <PdfContainer>
                  <InformationLabel>Lien du patron</InformationLabel>
                  <InformationLinkContainer>
                    <InformationLink
                      href={patternCard.pdf_instructions} target="_blank"
                    >
                      Cliquez ici pour visualiser le patron
                    </InformationLink>
                  </InformationLinkContainer>
                </PdfContainer>
                  {patternInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>

                        <InformationLabel htmlFor={input.htmlFor}>
                          {input.label}
                        </InformationLabel>

                        {(input.id !== 8) && (input.type !== "select") ? (
                          <>
                            <InformationInput
                              placeholder={values[input.info]}
                              onChange={onChange}
                              type={input.type}
                              name={input.name}
                              pattern={input.pattern}
                              data-error={input.errorMessage}
                            ></InformationInput>

                            {input.id == 8 ? (
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
                  {patternInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        <InformationLabel>{input.label}</InformationLabel>
                        {(index === 2) || (index === 8) && (patternCard[input.info].includes("http") | patternCard[input.info].includes("www") | patternCard[input.info].includes(".fr") | patternCard[input.info].includes(".com") | patternCard[input.info].includes(".net")) ? (
                          <InformationLinkContainer
                          >
                            <InformationLink
                              href={patternCard[input.info].includes("http") ? patternCard[input.info] : `https://${patternCard[input.info]}`}
                              target="_blank"
                            >
                              {patternCard[input.info]}
                            </InformationLink>
                          </InformationLinkContainer>
                        ) : (
                          <InformationInput
                            value={patternCard[input.info]}
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
                <ProjectTitle>Projets avec ce patron</ProjectTitle>
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
                aria-label="Retourner à la liste des patrons"
                ref={cardRef}
                onClick={() => {
                  navigate("/patrons");
                }}

              />
            </ReturnArrowContainer>
            <ModifyDeleteContainer>
              {!updatePatternInfo ? (
                <>
                  <ModifyContainer>
                    <ModifyButton
                      aria-label="Modifier ce patron"
                      onClick={updateCard}
                    />
                  </ModifyContainer>
                  <TrashContainer>
                    <TrashButton
                      aria-label="Supprimer ce patron"
                      ref={cardRef}
                      onClick={isOpenDeleteModal}
                    />
                  </TrashContainer>
                  <DeletePatternModal
                    setShowDeleteModal={setShowDeleteModal}
                    showDeleteModal={showDeleteModal}
                    deleteCard={deleteCard}
                  />


                </>
              ) : (
                <UpdateInformationContainer
                  initial={{ x: '-80px' }}
                  animate={{ x: 0 }}
                  transition={{ type: "linear" }}
                >
                  <UpdateInformationText>
                    Patron en cours de modification
                  </UpdateInformationText>

                </UpdateInformationContainer>
              )}
            </ModifyDeleteContainer>
          </ButtonsContainer>
          <CardContainer>
            {!updatePatternInfo ? (
              <ImageContainer>
                <ImageCard src={patternCard.photo} />
                <PreviewContainer>
                  <PatternPreviewTitle>Prévisualisation du patron</PatternPreviewTitle>
                  <PdfIframe src={patternCard.pdf_instructions}></PdfIframe>
                </PreviewContainer>
              </ImageContainer>
            ) : (
              <UpdateCardContainer>
                {/* <UpdatePhotoInput> */}
                  <UpdateImageCard src={preview} alt="pattern picture" />
                {/* </UpdatePhotoInput> */}
                <UpdateFileInputContainer>
                  <input
                    name="photo"
                    accept="image/*"
                    placeholder="Photo du patron"
                    required=""
                    type="file"
                    onChange={onChange}
                  ></input>
                </UpdateFileInputContainer>
                <PreviewContainer>
                  <PatternPreviewTitle>Prévisualisation du patron</PatternPreviewTitle>
                  {/* <UpdatePhotoInput> */}
                    <PdfIframe src={patternCard.pdf_instructions}  ></PdfIframe>
                  {/* </UpdatePhotoInput> */}
                  <UpdateFileInputContainer>
                  <input
                    name="pdf_instructions"
                    accept="image/*, .pdf, .doc"
                    placeholder="Photo du patron"
                    required=""
                    type="file"
                    onChange={onChange}
                  ></input>
                </UpdateFileInputContainer>
                </PreviewContainer>

              </UpdateCardContainer>
            )}
            <InformationContainer>
              <TitleContainer>
                <CardTitle>
                  {patternCard.name} - {patternCard.brand}
                </CardTitle>
              </TitleContainer>
              {updatePatternInfo ? (
                <InformationForm onSubmit={handleSubmit}>
                   <PdfContainer>
                  <InformationLabel>Lien du patron</InformationLabel>
                  <InformationLinkContainer>
                    <InformationLink
                      href={patternCard.pdf_instructions} target="_blank"
                    >
                      Cliquez ici pour visualiser le patron
                    </InformationLink>
                  </InformationLinkContainer>
                </PdfContainer>
                  {patternInputs.map((input, index) =>
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
                            {input.id == 6 || input.id == 8 ? (
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
                   <PdfContainer>
                  <InformationLabel>Lien du patron</InformationLabel>
                  <InformationLinkContainer>
                    <InformationLink
                      href={patternCard.pdf_instructions} target="_blank"
                    >
                      Cliquez ici pour visualiser le patron
                    </InformationLink>
                  </InformationLinkContainer>
                </PdfContainer>
                  {patternInputs.map((input, index) =>
                    index !== 0 ? (
                      <InformationContent key={input.id}>
                        <InformationLabel>{input.label}</InformationLabel>
                        {index === 2 && (patternCard[input.info].includes("http") | patternCard[input.info].includes("www") | patternCard[input.info].includes(".fr") | patternCard[input.info].includes(".com") | patternCard[input.info].includes(".net")) ? (
                          <InformationLinkContainer
                          >
                            <InformationLink
                              href={patternCard[input.info].includes("http") ? patternCard[input.info] : `https://${patternCard[input.info]}`}
                              target="_blank"
                            >
                              {patternCard[input.info]}
                            </InformationLink>
                          </InformationLinkContainer>
                        ) : (
                          <InformationInput
                            value={patternCard[input.info]}
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
                <ProjectTitle>Projets avec ce patron</ProjectTitle>
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
