import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeviceSize } from "../../Navbar/Responsive";
import { addOneProject } from "../../../store/state/projectSlice";
import {
    AddButton,
    CardsMapContainer,
    CardContainer,
    ImgContainer,
    CardImg,
    CardText,
    AddProjectContainer,
    TitleContainer,
    Title,
    FormContainer,
    Form,
    LabelInputContainer,
    InformationLabel,
    InformationInput,
    InformationSelect,
    Section,
    TitleSection,
    TitleSectionContainer,
    AddOneArticleContainer,
    AllFabricsContainer,
    PreviewContainer,
    Preview,
    Text,
    SelectedArticleInfo,
    QuantityLabel,
    QuantityInput,
    QuantityContainer,
    AddOneMoreButton,
    RemoveButton,
    MinusIcon,
    PlusIcon,
    ReturnButton,
    AddReturnButtonContainer,
    CardsContainer,
    PreviewButtonContainer,
    ButtonForm,
    PictureInputContainer,
    PictureInput
} from "./style";
import YtremaLogo from "../../../assets/images/logo.png";
import { addAllHaberdasheries } from "../../../store/state/haberdasherySlice";
import { useGetAllHaberdasheriesQuery } from "../../../store/api/ytremaApi";
import { AddFabric } from "./AddFabric";
import { AddHaberdashery } from "./AddHaberdashery";


export const AddProject = (props) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    const haberdasheries = persistedReducer.haberdasheries;
    const patterns = persistedReducer.patterns;
    const { data, error, isLoading, isSuccess, isError } = useGetAllHaberdasheriesQuery(auth.id);
  
//  //show fabric section
//  const [showFabricSection, setShowFabricSection] = useState(true);
//  const isOpeningFabricSection = () => {
//      setShowFabricSection((prev) => !prev);
//  };

//  //Show all fabrics
//  const [showAllFabrics, setShowAllFabrics] = useState(false);
//  const [fabricsFiltered, setFabricsFiltered] = useState([]);

//  const isOpeningFabricsCards = () => {
//      setShowAllFabrics((prev) => !prev);

//      // Create array with all fabrics remaining 
//      if (selectedFabric.length > 0) {
//          let fabricsFilteredArray = [];
//          let selectedFabricIdsArray = selectedFabric.map(elem => elem.id);

//          fabrics.value.map(fabric => {
//              !selectedFabricIdsArray.includes(fabric.id) && fabricsFilteredArray.push(fabric);
//          })

//          setFabricsFiltered(fabricsFilteredArray);
//      }
//  };

//  const isOpeningOneMoreFabric = (event) => {
//      setShowAddOneMoreButton(false);
//      !showAddOneMoreFabric && event.preventDefault();
//      setShowAddOneMoreFabric((prev) => !prev);
//  };

//  //Close the section to add one more fabric but show the button to add one fabric
//  const isClosingAddOneMoreFabric = (event) => {
//      !showAddOneMoreFabric && event.preventDefault();
//      setShowAddOneMoreFabric(false);
//      setShowAllFabrics(false);
//      setShowAddOneMoreButton(true);
//  };

//  //Fabric Preview
//  const [selectedFabric, setSelectedFabric] = useState([]);
//  const [fabricPreview, setFabricPreview] = useState();
//  const [addFabricPreview, setAddFabricPreview] = useState();
//  const [showAddOneMoreFabric, setShowAddOneMoreFabric] = useState(false);
 const [showAddOneMoreButton, setShowAddOneMoreButton] = useState(false);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllHaberdasheries(data.haberdasheries));
        }
    }, [data, haberdasheries]);

   

    const [values, setValues] = useState({
        name: "",
        status: "",
        personal_notes: "Photo du projet",
        photo: "",
        fabrics: [],
        haberdasheries: [],
        patterns: [],
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });

        if (event.target.dataset.selectedfabricid) {
            const fabricCard = fabrics.value.find((fabric) => fabric.id == event.target.dataset.selectedfabricid);
            let fabricObject = values;
            fabricObject.fabrics.push({
                fabric_id: fabricCard.id,
                fabric_purchase_qty: fabricCard.quantity,
                fabric_qty_stock:fabricCard.qty_stock,
                fabric_price: fabricCard.price,
                fabric_used_size: event.target.value,
            });

            // keep last fabric object with same the id
            let fabricsResult = [
                ...fabricObject.fabrics
                    .reduce((acc, cur) => {
                        return acc.set(cur.fabric_id, cur);
                    }, new Map())
                    .values(),
            ];
            fabricObject.fabrics = fabricsResult;
            setValues(fabricObject);
            setShowAddOneMoreButton(true);
        };
        if (event.target.dataset.selectedhaberdasheryid) {
            const haberdasheryCard = haberdasheries.value.find((haberdashery) => haberdashery.id == event.target.dataset.selectedhaberdasheryid);
            let haberdasheryObject = values;
            haberdasheryObject.haberdasheries.push({
                haberdashery_id: haberdasheryCard.id,
                haberdashery_is_cut : haberdasheryCard.is_cut,
                haberdashery_is_a_set : haberdasheryCard.is_a_set,
                haberdashery_purchase_qty : haberdasheryCard.purchase_qty,
                haberdashery_qty_stock: haberdasheryCard.qty_stock,
                haberdashery_price: haberdasheryCard.price,
                haberdashery_used_size: event.target.value,
            });

            // keep last fabric object with same the id
            let haberdasheriesResult = [
                ...haberdasheryObject.haberdasheries
                    .reduce((acc, cur) => {
                        return acc.set(cur.haberdashery_id, cur);
                    }, new Map())
                    .values(),
            ];

            haberdasheryObject.haberdasheries = haberdasheriesResult;
            setValues(haberdasheryObject);
            setShowAddOneMoreButton(true);
        }
        if (event.target.name === 'photo') {
            
            onSelectPicture(event);
            if (!event.target.files || event.target.files.length > 0) {
                handleUpload(event.target.files[0]);
            }
        }
    };


    //HABERDASHERY

    // //show haberdashery section
    // const [showHaberdasherySection, setShowHaberdasherySection] = useState(false);
    // const isOpeningHaberdasherySection = () => {
    //     setShowHaberdasherySection((prev) => !prev);
    // };
    // //Show all haberdasheries
    // const [showAllHaberdasheries, setShowAllHaberdasheries] = useState(false);
    // const [haberdasheriesFiltered, setHaberdasheriesFiltered] = useState([]);

    // const isOpeningHaberdasheriesCards = () => {
    //     setShowAllHaberdasheries((prev) => !prev);

    //     // Create array with all haberdasheries remaining 
    //     if (selectedHaberdashery.length > 0) {
    //         let haberdasheriesFilteredArray = [];
    //         let selectedHaberdasheryIdsArray = selectedHaberdashery.map(elem => elem.id);

    //         haberdasheries.value.map(haberdashery => {
    //             !selectedHaberdasheryIdsArray.includes(haberdashery.id) && haberdasheriesFilteredArray.push(haberdashery);
    //         })

    //         setHaberdasheriesFiltered(haberdasheriesFilteredArray);
    //     }
    // };

    // const isOpeningOneMoreHaberdashery = (event) => {
    //     setShowAddOneMoreButton(false);
    //     !showAddOneMoreHaberdashery && event.preventDefault();
    //     setShowAddOneMoreHaberdashery((prev) => !prev);
    // };

    // //Close the section to add one more haberdashery but show the button to add one haberdashery
    // const isClosingAddOneMoreHaberdashery = (event) => {
    //     !showAddOneMoreHaberdashery && event.preventDefault();
    //     setShowAddOneMoreHaberdashery(false);
    //     setShowAllHaberdasheries(false);
    //     setShowAddOneMoreButton(true);
    // };

    // //Haberdashery Preview
    // const [selectedHaberdashery, setSelectedHaberdashery] = useState([]);
    // const [haberdasheryPreview, setHaberdasheryPreview] = useState();
    // const [addHaberdasheryPreview, setAddHaberdasheryPreview] = useState();
    // const [showAddOneMoreHaberdashery, setShowAddOneMoreHaberdashery] = useState(false);

    //PATTERNS

    //show pattern section
    const [showPatternSection, setShowPatternSection] = useState(false);
    const isOpeningPatternSection = () => {
        setShowPatternSection((prev) => !prev);
    };
    //Show all patterns
    const [showAllPatterns, setShowAllPatterns] = useState(false);
    const [patternsFiltered, setPatternsFiltered] = useState([]);

    const isOpeningPatternsCards = () => {
        setShowAllPatterns((prev) => !prev);

        // Create array with all patterns remaining 
        if (selectedPattern.length > 0) {
            let patternsFilteredArray = [];
            let selectedPatternIdsArray = selectedPattern.map(elem => elem.id);

            patterns.value.map(pattern => {
                !selectedPatternIdsArray.includes(pattern.id) && patternsFilteredArray.push(pattern);
            })

            setPatternsFiltered(patternsFilteredArray);
        }
    };

    const isOpeningOneMorePattern = (event) => {
        setShowAddOneMoreButton(true);
        !showAddOneMorePattern && event.preventDefault();
        setShowAddOneMorePattern((prev) => !prev);
    };

    //Close the section to add one more pattern but show the button to add one pattern
    const isClosingAddOneMorePattern = (event) => {
        !showAddOneMorePattern && event.preventDefault();
        setShowAddOneMorePattern(false);
        setShowAllPatterns(false);
        setShowAddOneMoreButton(true);
    };

    //Pattern Preview
    const [selectedPattern, setSelectedPattern] = useState([]);
    const [patternPreview, setPatternPreview] = useState();
    const [addPatternPreview, setAddPatternPreview] = useState();
    const [showAddOneMorePattern, setShowAddOneMorePattern] = useState(false);

    //PICTURE
    //show picture section
    const [showPictureSection, setShowPictureSection] = useState(false);
    const isOpeningPictureSection = () => {
        setShowPictureSection((prev) => !prev);
    };

    //
    const [selectedPicture, setSelectedPicture] = useState();
    const [preview, setPreview] = useState();
    const [pictureURL, setPictureURL] = useState();

    useEffect(() => {
        if (!selectedPicture) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedPicture);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedPicture]);

    const onSelectPicture = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedPicture(undefined);
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedPicture(event.target.files[0]);
    }

    //propre a firebase
    const handleUpload = (picture) => {

        const uploadTask = storage.ref(`projet/${picture.name}`).put(picture);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(picture.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url, 'url dans handleupload');
                        setPictureURL(url);
                        setPreview(url);
                    });
            }
        );
    };

    //Submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const valuesToSend = values;
        valuesToSend.photo = pictureURL;
        console.log(valuesToSend, 'valuesToSend dans submit form');

        // await addOneProject({ memberId: auth.id, body: valuesToSend });



    };

    return (
        <>
            <AddProjectContainer>
                <TitleContainer>
                    <Title> CREER VOTRE PROJET</Title>
                </TitleContainer>

                <FormContainer>
                    <Form>
                        <LabelInputContainer>
                            <InformationLabel htmlFor="name">Nom du projet</InformationLabel>
                            <InformationInput
                                id="name"
                                type="text"
                                name="name"
                                onChange={onChange}
                            // onChange={onChange}
                            ></InformationInput>
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <InformationLabel htmlFor="status">Statut</InformationLabel>
                            <InformationSelect
                                id="status"
                                name="status"
                                onChange={onChange}
                            //add a key
                            >
                                <option value="" defaultValue>
                                    --Choisissez un statut--
                                </option>
                                <option value="Découpe du patron">Découpe du patron</option>
                                <option value="Découpe du tissu">Découpe du tissu</option>
                                <option value="Couture">Couture</option>
                                <option value="Terminé">Terminé</option>
                            </InformationSelect>
                        </LabelInputContainer>
                        {/* Fabric Section */}
                        <AddFabric
                            onChange={onChange}
                            values={values}
                            setValues={setValues}
                            showAddOneMoreButton={showAddOneMoreButton}
                            setShowAddOneMoreButton={setShowAddOneMoreButton}
                        />

                        {/* Haberdashery Section */}
                        <AddHaberdashery
                            onChange={onChange}
                            values={values}
                            setValues={setValues}
                            showAddOneMoreButton={showAddOneMoreButton}
                            setShowAddOneMoreButton={setShowAddOneMoreButton}
                        />
                       

                        {/* Pattern Section */}
                        <Section>
                            <TitleSectionContainer>
                                <TitleSection>PATRONS</TitleSection>
                                {showPatternSection ? (
                                    <MinusIcon onClick={isOpeningPatternSection} />
                                ) : (
                                    <PlusIcon onClick={isOpeningPatternSection} />
                                )}
                            </TitleSectionContainer>
                            {showPatternSection && (
                                <>
                                    <AddOneArticleContainer>
                                        {/* AFFICHAGE DES PATRONS DEJA SELECTIONNES */}
                                        <PreviewContainer
                                            className="pattern"
                                        >
                                            {selectedPattern.length == 0 && (
                                                <>
                                                    <Text>Sélectionnez votre premier patron</Text>
                                                    <PreviewButtonContainer
                                                        className="firstShow"
                                                    >
                                                        <Preview src={YtremaLogo}></Preview>
                                                        <AddButton
                                                            onClick={isOpeningPatternsCards}
                                                            className="Alone" />
                                                    </PreviewButtonContainer>

                                                </>
                                            )}
                                        </PreviewContainer>
                                    </AddOneArticleContainer>

                                    {selectedPattern.length > 0 ? (
                                        <>
                                            {selectedPattern.map((selectedPat, index) => (
                                                <AddOneArticleContainer key={selectedPat.id}>
                                                    <PreviewContainer
                                                        className="pattern"
                                                    >
                                                        <Text>Patron sélectionné n°{index + 1}</Text>
                                                        <PreviewButtonContainer>
                                                            <Preview
                                                                src={selectedPat.photo}
                                                                data-selectedpatternid={selectedPat.id}
                                                            ></Preview>
                                                            <RemoveButton
                                                                onClick={() => {
                                                                    setSelectedPattern((current) =>
                                                                        current.filter((pattern) => {
                                                                            return pattern.id !== selectedPat.id;
                                                                        })
                                                                    );
                                                                    let updatedPatterns = values.patterns.filter(
                                                                        (pattern) => {
                                                                            return pattern.pattern_id != selectedPat.id;
                                                                        }
                                                                    );
                                                                    let valuesUpdated = values;
                                                                    valuesUpdated.patterns = updatedPatterns;
                                                                    setValues(valuesUpdated);
                                                                }}
                                                            />
                                                        </PreviewButtonContainer>

                                                        <SelectedArticleInfo
                                                            className="pattern"
                                                        >
                                                            {selectedPat.clothing} {" "} {selectedPat.name} {" - "} {selectedPat.brand}
                                                        </SelectedArticleInfo>
                                                        {/* <QuantityContainer>
                                                            <QuantityLabel>
                                                                Quantité
                                                            </QuantityLabel>
                                                            <QuantityInput
                                                                type="number"
                                                                id="pattern"
                                                                disabled
                                                                data-selectedpatternid={selectedPat.id}
                                                                data-selectedhaberdasheryquantity={
                                                                    selectedPat.quantity
                                                                }
                                                        
                                                                name="pattern"
                                                                placeholder={
                                                                    1
                                                                    // values.patterns.find(
                                                                    //     (elem) => elem.pattern_id == selectedPat.id
                                                                    // )
                                                                    //     ? values.patterns[values.patterns.indexOf(values.patterns.find(
                                                                    //         (elem) => elem.pattern_id == selectedPat.id
                                                                    //     ))].pattern_id
                                                                    //     : null
                                                                }
                                                                onChange={onChange}
                                                            ></QuantityInput>
                                                        </QuantityContainer> */}
                                                    </PreviewContainer>
                                                </AddOneArticleContainer>
                                            ))}
                                        </>
                                    ) : null}

                                    {/* AJOUT PATRON SUPP */}

                                    {showAddOneMorePattern && (
                                        <>
                                            <AddOneArticleContainer>
                                                <PreviewContainer
                                                    className="pattern"
                                                >
                                                    <Text>Sélectionnez votre patron</Text>
                                                    <PreviewButtonContainer
                                                        className="firstShow"
                                                    >
                                                        <Preview
                                                            src={
                                                                addPatternPreview !== undefined
                                                                    ? addPatternPreview
                                                                    : YtremaLogo
                                                            }
                                                        ></Preview>
                                                        <AddReturnButtonContainer>
                                                            <ReturnButton
                                                                onClick={isClosingAddOneMorePattern}
                                                                className="AddOneMoreSection"
                                                            />
                                                            <AddButton
                                                                onClick={isOpeningPatternsCards}
                                                                className="AddOneMoreSection"
                                                            />
                                                        </AddReturnButtonContainer>

                                                    </PreviewButtonContainer>
                                                </PreviewContainer>
                                            </AddOneArticleContainer>

                                            {selectedPattern >= 1 && (
                                                <SelectedArticleInfo
                                                    className="pattern"
                                                    data-selectedpatternid={
                                                        selectedPattern[selectedPattern.length - 1].id
                                                    }
                                                >
                                                    {selectedPattern[selectedPattern.length - 1].name} -{" "}
                                                </SelectedArticleInfo>
                                            )}
                                        </>
                                    )}

                                    {/* AFFICHAGE DES PATRONS A SELECTIONNER AU DEMARRAGE */}
                                    {patterns && showAllPatterns && selectedPattern.length == 0 && (
                                        <CardsContainer>
                                            {patterns.value.map((pattern) => (
                                                <CardsMapContainer
                                                    key={pattern.id}
                                                    onClick={() => {
                                                        isOpeningPatternsCards();
                                                        let patObject = selectedPattern;
                                                        patObject.push(pattern);
                                                        setSelectedPattern(patObject);
                                                        setPatternPreview(pattern.photo);
                                                        showAddOneMorePattern && isOpeningOneMorePattern();
                                                        let patternObject = values;
                                                        patternObject.patterns.push({
                                                            pattern_id: pattern.id
                                                        });

                                                        // keep last pattern object with same the id
                                                        let patternsResult = [
                                                            ...patternObject.patterns
                                                                .reduce((acc, cur) => {
                                                                    return acc.set(cur.pattern_id, cur);
                                                                }, new Map())
                                                                .values(),
                                                        ];

                                                        patternObject.patterns = patternsResult;
                                                        setValues(patternObject);
                                                        setShowAddOneMoreButton(true);
                                                    }}

                                                >
                                                    <CardContainer
                                                        key={pattern.id}
                                                    >
                                                        <ImgContainer>
                                                            <CardImg src={pattern.photo} alt={pattern.alt} />
                                                        </ImgContainer>
                                                        <CardText>
                                                            {pattern.clothing} - {pattern.name} - {pattern.brand}
                                                        </CardText>
                                                    </CardContainer>
                                                </CardsMapContainer>
                                            ))}
                                        </CardsContainer>
                                    )}

                                    {/* AFFICHAGE FILTRE DES PATRONS RESTANTS A SELECTIONNER */}
                                    {showAllPatterns && selectedPattern.length > 0 && (
                                        <CardsContainer>
                                            {patternsFiltered.map((pattern) => (
                                                <CardsMapContainer
                                                    key={pattern.id}
                                                    onClick={() => {
                                                        isOpeningPatternsCards();
                                                        let patObject = selectedPattern;
                                                        patObject.push(pattern);
                                                        setSelectedPattern(patObject);
                                                        setPatternPreview(pattern.photo);
                                                        showAddOneMorePattern && isOpeningOneMorePattern
                                                    }}
                                                >
                                                    <CardContainer key={pattern.id}>
                                                        <ImgContainer>
                                                            <CardImg src={pattern.photo} alt={pattern.alt} />
                                                        </ImgContainer>

                                                        <CardText>
                                                            {pattern.clothing} - {pattern.name} - {pattern.brand}
                                                        </CardText>
                                                    </CardContainer>
                                                </CardsMapContainer>
                                            ))}
                                        </CardsContainer>
                                    )}

                                    {showAddOneMoreButton && selectedPattern.length > 0 && (
                                        <AddOneMoreButton onClick={isOpeningOneMorePattern}>
                                            Sélectionner un patron supplémentaire
                                        </AddOneMoreButton>
                                    )}
                                </>
                            )}
                        </Section>

                        {/* Project picture */}
                        <Section>
                            <TitleSectionContainer>
                                <TitleSection>PHOTO DU PROJET</TitleSection>
                                {showPictureSection ? (
                                    <MinusIcon onClick={isOpeningPictureSection} />
                                ) : (
                                    <PlusIcon onClick={isOpeningPictureSection} />
                                )}
                            </TitleSectionContainer>
                            {showPictureSection && (
                                <>
                                    <AddOneArticleContainer>
                                        {/* CHOISIR UNE PHOTO DE PROFIL AU PROJET */}
                                        <PreviewContainer>


                                            <Text>Sélectionnez une photo pour votre projet</Text>
                                            <PreviewButtonContainer
                                            // className="firstShow"
                                            >
                                                {values.photo ?
                                                <Preview src={preview}></Preview>
                                                :
                                                <Preview src={YtremaLogo}></Preview>
                                                }
                                                {/* <Preview src={values.photo.length == 0 ? YtremaLogo : preview}></Preview> */}

                                            </PreviewButtonContainer>
                                            <PictureInputContainer>
                                                <label htmlFor="projectPicture"></label>
                                                <PictureInput
                                                    htmlFor="projectPicture"
                                                    accept="image/*"
                                                    placeholder="Photo du projet"
                                                    type="file"
                                                    name="photo"
                                                    onChange={onChange}
                                                >
                                                </PictureInput>
                                            </PictureInputContainer>
                                        </PreviewContainer>
                                    </AddOneArticleContainer>
                                </>
                            )}

                        </Section>
                        <ButtonForm
                            type='submit'
                            onClick={handleSubmit}
                        >
                            Enregister ce projet
                        </ButtonForm>
                    </Form>
                </FormContainer>
            </AddProjectContainer>
        </>
    );
};
