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


export const AddProject = (props) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;
    const haberdasheries = persistedReducer.haberdasheries;
    const { data, error, isLoading, isSuccess, isError } = useGetAllHaberdasheriesQuery(auth.id);
    const patterns = persistedReducer.patterns;


    useEffect(() => {
        if (isSuccess && data) {
            dispatch(addAllHaberdasheries(data.haberdasheries));
        }
    }, [data, haberdasheries]);

    //show fabric section
    const [showFabricSection, setShowFabricSection] = useState(true);
    const isOpeningFabricSection = () => {
        setShowFabricSection((prev) => !prev);
    };

    //Show all fabrics
    const [showAllFabrics, setShowAllFabrics] = useState(false);
    const [fabricsFiltered, setFabricsFiltered] = useState([]);

    const isOpeningFabricsCards = () => {
        setShowAllFabrics((prev) => !prev);

        // Create array with all fabrics remaining 
        if (selectedFabric.length > 0) {
            let fabricsFilteredArray = [];
            let selectedFabricIdsArray = selectedFabric.map(elem => elem.id);

            fabrics.value.map(fabric => {
                !selectedFabricIdsArray.includes(fabric.id) && fabricsFilteredArray.push(fabric);
            })

            setFabricsFiltered(fabricsFilteredArray);
        }
    };

    const isOpeningOneMoreFabric = (event) => {
        setShowAddOneMoreButton(false);
        !showAddOneMoreFabric && event.preventDefault();
        setShowAddOneMoreFabric((prev) => !prev);
    };

    //Close the section to add one more fabric but show the button to add one fabric
    const isClosingAddOneMoreFabric = (event) => {
        !showAddOneMoreFabric && event.preventDefault();
        setShowAddOneMoreFabric(false);
        setShowAllFabrics(false);
        setShowAddOneMoreButton(true);
    };

    //Fabric Preview
    const [selectedFabric, setSelectedFabric] = useState([]);
    const [fabricPreview, setFabricPreview] = useState();
    const [addFabricPreview, setAddFabricPreview] = useState();
    const [showAddOneMoreFabric, setShowAddOneMoreFabric] = useState(false);
    const [showAddOneMoreButton, setShowAddOneMoreButton] = useState(false);

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
            let fabricObject = values;
            fabricObject.fabrics.push({
                fabric_id: event.target.dataset.selectedfabricid,
                fabric_quantity: event.target.dataset.selectedfabricquantity,
                fabric_price: event.target.dataset.selectedfabricprice,
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

            let haberdasheryObject = values;
            haberdasheryObject.haberdasheries.push({
                haberdashery_id: event.target.dataset.selectedhaberdasheryid,
                haberdashery_quantity: event.target.dataset.selectedhaberdasheryquantity,
                haberdashery_price: event.target.dataset.selectedhaberdasheryprice,
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

    //show haberdashery section
    const [showHaberdasherySection, setShowHaberdasherySection] = useState(false);
    const isOpeningHaberdasherySection = () => {
        setShowHaberdasherySection((prev) => !prev);
    };
    //Show all haberdasheries
    const [showAllHaberdasheries, setShowAllHaberdasheries] = useState(false);
    const [haberdasheriesFiltered, setHaberdasheriesFiltered] = useState([]);

    const isOpeningHaberdasheriesCards = () => {
        setShowAllHaberdasheries((prev) => !prev);

        // Create array with all haberdasheries remaining 
        if (selectedHaberdashery.length > 0) {
            let haberdasheriesFilteredArray = [];
            let selectedHaberdasheryIdsArray = selectedHaberdashery.map(elem => elem.id);

            haberdasheries.value.map(haberdashery => {
                !selectedHaberdasheryIdsArray.includes(haberdashery.id) && haberdasheriesFilteredArray.push(haberdashery);
            })

            setHaberdasheriesFiltered(haberdasheriesFilteredArray);
        }
    };

    const isOpeningOneMoreHaberdashery = (event) => {
        setShowAddOneMoreButton(false);
        !showAddOneMoreHaberdashery && event.preventDefault();
        setShowAddOneMoreHaberdashery((prev) => !prev);
    };

    //Close the section to add one more haberdashery but show the button to add one haberdashery
    const isClosingAddOneMoreHaberdashery = (event) => {
        !showAddOneMoreHaberdashery && event.preventDefault();
        setShowAddOneMoreHaberdashery(false);
        setShowAllHaberdasheries(false);
        setShowAddOneMoreButton(true);
    };

    //Haberdashery Preview
    const [selectedHaberdashery, setSelectedHaberdashery] = useState([]);
    const [haberdasheryPreview, setHaberdasheryPreview] = useState();
    const [addHaberdasheryPreview, setAddHaberdasheryPreview] = useState();
    const [showAddOneMoreHaberdashery, setShowAddOneMoreHaberdashery] = useState(false);

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
                        <Section>
                            <TitleSectionContainer>
                                <TitleSection>TISSUS</TitleSection>
                                {showFabricSection ? (
                                    <MinusIcon onClick={isOpeningFabricSection} />
                                ) : (
                                    <PlusIcon onClick={isOpeningFabricSection} />
                                )}
                            </TitleSectionContainer>
                            {showFabricSection && (
                                <>
                                    <AddOneArticleContainer>
                                        {/* AFFICHAGE DES TISSUS DEJA SELECTIONNES */}
                                        <PreviewContainer>
                                            {selectedFabric.length == 0 && (
                                                <>

                                                    <Text>Sélectionnez votre premier tissu</Text>
                                                    <PreviewButtonContainer
                                                        className="firstShow"
                                                    >
                                                        <Preview src={YtremaLogo}></Preview>
                                                        <AddButton
                                                            onClick={isOpeningFabricsCards}
                                                            className="Alone"
                                                        />
                                                    </PreviewButtonContainer>
                                                </>
                                            )}
                                        </PreviewContainer>
                                    </AddOneArticleContainer>

                                    {selectedFabric.length > 0 ? (
                                        <>
                                            {selectedFabric.map((selectedFab, index) => (
                                                <AddOneArticleContainer key={selectedFab.id}>
                                                    <PreviewContainer>
                                                        <Text>Tissu sélectionné n°{index + 1}</Text>
                                                        <PreviewButtonContainer>
                                                            <Preview src={selectedFab.photo}></Preview>
                                                            <RemoveButton
                                                                onClick={() => {
                                                                    setSelectedFabric((current) =>
                                                                        current.filter((fabric) => {
                                                                            return fabric.id !== selectedFab.id;
                                                                        })
                                                                    );
                                                                    let updatedFabrics = values.fabrics.filter(
                                                                        (fabric) => {
                                                                            return fabric.fabric_id != selectedFab.id;
                                                                        }
                                                                    );
                                                                    let valuesUpdated = values;
                                                                    valuesUpdated.fabrics = updatedFabrics;
                                                                    setValues(valuesUpdated);
                                                                }}
                                                            />
                                                        </PreviewButtonContainer>

                                                        <SelectedArticleInfo>
                                                            {selectedFab.name} - {selectedFab.designer} -{" "}
                                                            {selectedFab.quantity} cm
                                                        </SelectedArticleInfo>
                                                        <QuantityContainer>
                                                            <QuantityLabel htmlFor="fabric_used_size">
                                                                Quantité
                                                            </QuantityLabel>
                                                            <QuantityInput
                                                                type="number"
                                                                mobile
                                                                id="fabric_used_size"
                                                                data-selectedfabricid={selectedFab.id}
                                                                data-selectedfabricquantity={
                                                                    selectedFab.quantity
                                                                }
                                                                data-selectedfabricprice={selectedFab.price}
                                                                name="fabric_used_size"
                                                                max={selectedFab.quantity}
                                                                step="1"
                                                                placeholder={
                                                                    values.fabrics.find(
                                                                        (elem) => elem.fabric_id == selectedFab.id
                                                                    )
                                                                        ? values.fabrics[values.fabrics.indexOf(values.fabrics.find(
                                                                            (elem) => elem.fabric_id == selectedFab.id
                                                                        ))].fabric_used_size
                                                                        : null
                                                                }
                                                                onChange={onChange}
                                                            ></QuantityInput>
                                                        </QuantityContainer>
                                                    </PreviewContainer>
                                                </AddOneArticleContainer>
                                            ))}
                                        </>
                                    ) : null}

                                    {/* AJOUT TISSU SUPP */}

                                    {showAddOneMoreFabric && (
                                        <>
                                            <AddOneArticleContainer>
                                                <PreviewContainer>

                                                    <Text>Sélectionnez votre tissu</Text>
                                                    <PreviewButtonContainer
                                                        className="firstShow"
                                                    >
                                                        <Preview
                                                            src={
                                                                addFabricPreview !== undefined
                                                                    ? addFabricPreview
                                                                    : YtremaLogo
                                                            }
                                                        ></Preview>
                                                        <AddReturnButtonContainer>
                                                            <ReturnButton
                                                                onClick={isClosingAddOneMoreFabric}
                                                                className="AddOneMoreSection"
                                                            />

                                                            <AddButton
                                                                onClick={isOpeningFabricsCards}
                                                                className="AddOneMoreSection"
                                                            />
                                                        </AddReturnButtonContainer>

                                                    </PreviewButtonContainer>

                                                </PreviewContainer>
                                            </AddOneArticleContainer>

                                            {selectedFabric >= 1 && (
                                                <>
                                                    <SelectedArticleInfo>
                                                        {selectedFabric[selectedFabric.length - 1].name} -{" "}
                                                        {
                                                            selectedFabric[selectedFabric.length - 1]
                                                                .designer
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            selectedFabric[selectedFabric.length - 1]
                                                                .quantity
                                                        }{" "}
                                                        cm
                                                    </SelectedArticleInfo>
                                                    <QuantityContainer>
                                                        <QuantityLabel htmlFor="fabric_used_size">
                                                            Quantité
                                                        </QuantityLabel>
                                                        <QuantityInput
                                                            type="number"
                                                            id="fabric_used_size"
                                                            data-selectedfabricid={
                                                                selectedFabric[selectedFabric.length - 1].id
                                                            }
                                                            data-selectedfabricquantity={
                                                                selectedFabric[selectedFabric.length - 1]
                                                                    .quantity
                                                            }
                                                            data-selectedfabricprice={
                                                                selectedFabric[selectedFabric.length - 1]
                                                                    .price
                                                            }
                                                            name="fabric_used_size"
                                                            max={
                                                                selectedFabric[selectedFabric.length - 1]
                                                                    .quantity
                                                            }
                                                            step="1"
                                                            placeholder="ex: 120"
                                                            onChange={onChange}
                                                        ></QuantityInput>
                                                    </QuantityContainer>
                                                </>

                                            )}
                                        </>
                                    )}

                                    {/* AFFICHAGE DES TISSUS A SELECTIONNER AU DEMARRAGE */}
                                    {fabrics && showAllFabrics && selectedFabric.length == 0 && (
                                        <AllFabricsContainer className="All Fabrics">
                                            {fabrics.value.map((fabric) => (
                                                <CardsMapContainer
                                                    key={fabric.id}
                                                    onClick={() => {
                                                        isOpeningFabricsCards();
                                                        let object = selectedFabric;
                                                        object.push(fabric);
                                                        setSelectedFabric(object);
                                                        setFabricPreview(fabric.photo);
                                                        showAddOneMoreFabric && isOpeningOneMoreFabric();
                                                    }}
                                                >
                                                    <CardContainer key={fabric.id}>
                                                        <ImgContainer>
                                                            <CardImg src={fabric.photo} alt={fabric.alt} />
                                                        </ImgContainer>

                                                        <CardText>
                                                            {fabric.fabric} - {fabric.name} -{" "}
                                                            {fabric.designer} - {fabric.quantity} cm
                                                        </CardText>
                                                    </CardContainer>
                                                </CardsMapContainer>
                                            ))}
                                        </AllFabricsContainer>
                                    )}

                                    {/* AFFICHAGE FILTRE DES TISSUS RESTANTS A SELECTIONNER */}
                                    {/* fabricsFiltered */}
                                    {showAllFabrics && selectedFabric.length > 0 && (
                                        <AllFabricsContainer className="All Fabrics">
                                            {fabricsFiltered.map((fabric) => (
                                                <CardsMapContainer
                                                    key={fabric.id}
                                                    onClick={() => {
                                                        isOpeningFabricsCards();
                                                        let object = selectedFabric;
                                                        object.push(fabric);
                                                        setSelectedFabric(object);
                                                        setFabricPreview(fabric.photo);
                                                        showAddOneMoreFabric && isOpeningOneMoreFabric();
                                                    }}
                                                >
                                                    <CardContainer key={fabric.id}>
                                                        <ImgContainer>
                                                            <CardImg src={fabric.photo} alt={fabric.alt} />
                                                        </ImgContainer>

                                                        <CardText>
                                                            {fabric.fabric} - {fabric.name} -{" "}
                                                            {fabric.designer} - {fabric.quantity} cm
                                                        </CardText>
                                                    </CardContainer>
                                                </CardsMapContainer>
                                            ))}
                                        </AllFabricsContainer>
                                    )}

                                    {showAddOneMoreButton && selectedFabric.length > 0 && (
                                        <AddOneMoreButton onClick={isOpeningOneMoreFabric}>
                                            Sélectionner un tissu supplémentaire
                                        </AddOneMoreButton>
                                    )}
                                </>
                            )}
                        </Section>

                        {/* Haberdashery Section */}
                        <Section>
                            <TitleSectionContainer>
                                <TitleSection>MERCERIE</TitleSection>
                                {showHaberdasherySection ? (
                                    <MinusIcon onClick={isOpeningHaberdasherySection} />
                                ) : (
                                    <PlusIcon onClick={isOpeningHaberdasherySection} />
                                )}
                            </TitleSectionContainer>
                            {showHaberdasherySection && (
                                <>
                                    <AddOneArticleContainer>
                                        {/* AFFICHAGE DE LA MERCERIE DEJA SELECTIONNES */}
                                        <PreviewContainer
                                            className="haberdashery"
                                        >
                                            {selectedHaberdashery.length == 0 && (
                                                <>
                                                    <Text>Sélectionnez votre premier article</Text>
                                                    <PreviewButtonContainer
                                                        className="firstShow"
                                                    >
                                                        <Preview src={YtremaLogo}></Preview>
                                                        <AddButton
                                                            onClick={isOpeningHaberdasheriesCards}
                                                            className="Alone" />
                                                    </PreviewButtonContainer>

                                                </>
                                            )}
                                        </PreviewContainer>
                                    </AddOneArticleContainer>

                                    {selectedHaberdashery.length > 0 ? (
                                        <>
                                            {selectedHaberdashery.map((selectedHab, index) => (
                                                <AddOneArticleContainer key={selectedHab.id}>
                                                    <PreviewContainer
                                                        className="haberdashery"
                                                    >
                                                        <Text>Mercerie sélectionnée n°{index + 1}</Text>
                                                        <PreviewButtonContainer>
                                                            <Preview src={selectedHab.photo}></Preview>
                                                            <RemoveButton
                                                                onClick={() => {
                                                                    setSelectedHaberdashery((current) =>
                                                                        current.filter((haberdashery) => {
                                                                            return haberdashery.id !== selectedHab.id;
                                                                        })
                                                                    );
                                                                    let updatedHaberdasheries = values.haberdasheries.filter(
                                                                        (haberdashery) => {
                                                                            return haberdashery.haberdashery_id != selectedHab.id;
                                                                        }
                                                                    );
                                                                    let valuesUpdated = values;
                                                                    valuesUpdated.haberdasheries = updatedHaberdasheries;
                                                                    setValues(valuesUpdated);
                                                                }}
                                                            />
                                                        </PreviewButtonContainer>

                                                        <SelectedArticleInfo>
                                                            {selectedHab.name} - {selectedHab.size} {" "}{selectedHab.unity} - qté:{" "}
                                                            {selectedHab.quantity}
                                                        </SelectedArticleInfo>
                                                        <QuantityContainer>
                                                            <QuantityLabel>
                                                                Quantité
                                                            </QuantityLabel>
                                                            <QuantityInput
                                                                type="number"
                                                                id="haberdashery_used_size"
                                                                data-selectedhaberdasheryid={selectedHab.id}
                                                                data-selectedhaberdasheryquantity={
                                                                    selectedHab.quantity
                                                                }
                                                                data-selectedhaberdasheryprice={selectedHab.price}
                                                                name="haberdashery_used_size"
                                                                max={selectedHab.quantity}
                                                                step="1"
                                                                placeholder={
                                                                    values.haberdasheries.find(
                                                                        (elem) => elem.haberdashery_id == selectedHab.id
                                                                    )
                                                                        ? values.haberdasheries[values.haberdasheries.indexOf(values.haberdasheries.find(
                                                                            (elem) => elem.haberdashery_id == selectedHab.id
                                                                        ))].haberdashery_used_size
                                                                        : null
                                                                }
                                                                onChange={onChange}
                                                            ></QuantityInput>
                                                        </QuantityContainer>
                                                    </PreviewContainer>
                                                </AddOneArticleContainer>
                                            ))}
                                        </>
                                    ) : null}

                                    {/* AJOUT MERCERIE SUPP */}

                                    {showAddOneMoreHaberdashery && (
                                        <>
                                            <AddOneArticleContainer>
                                                <PreviewContainer
                                                    className="haberdashery"
                                                >
                                                    <Text>Sélectionnez votre article</Text>
                                                    <PreviewButtonContainer
                                                        className="firstShow"
                                                    >
                                                        <Preview
                                                            src={
                                                                addHaberdasheryPreview !== undefined
                                                                    ? addHaberdasheryPreview
                                                                    : YtremaLogo
                                                            }
                                                        ></Preview>
                                                        <AddReturnButtonContainer>
                                                            <ReturnButton
                                                                onClick={isClosingAddOneMoreHaberdashery}
                                                                className="AddOneMoreSection"
                                                            />
                                                            <AddButton
                                                                onClick={isOpeningHaberdasheriesCards}
                                                                className="AddOneMoreSection"
                                                            />
                                                        </AddReturnButtonContainer>

                                                    </PreviewButtonContainer>
                                                </PreviewContainer>
                                            </AddOneArticleContainer>

                                            {selectedHaberdashery >= 1 && (
                                                <>
                                                    <SelectedArticleInfo>
                                                        {selectedHaberdashery[selectedHaberdashery.length - 1].name} -{" "}
                                                        {
                                                            selectedHaberdashery[selectedHaberdashery.length - 1]
                                                                .size
                                                        }{" "}
                                                        {" "}
                                                        {
                                                            selectedHaberdashery[selectedHaberdashery.length - 1]
                                                                .unity
                                                        }{" - "}
                                                        qté:
                                                        {
                                                            selectedHaberdashery[selectedHaberdashery.length - 1]
                                                                .quantity
                                                        }{" "}
                                                    </SelectedArticleInfo>
                                                    <QuantityContainer>
                                                        <QuantityLabel htmlFor="haberdashery_used_size">
                                                            Quantité
                                                        </QuantityLabel>
                                                        <QuantityInput
                                                            type="number"
                                                            id="haberdashery_used_size"
                                                            data-selectedhaberdasheryid={
                                                                selectedHaberdashery[selectedHaberdashery.length - 1].id
                                                            }
                                                            data-selectedhaberdasheryquantity={
                                                                selectedHaberdashery[selectedHaberdashery.length - 1]
                                                                    .quantity
                                                            }
                                                            data-selectedhaberdasheryprice={
                                                                selectedHaberdashery[selectedHaberdashery.length - 1]
                                                                    .price
                                                            }
                                                            name="haberdashery_used_size"
                                                            max={
                                                                selectedHaberdashery[selectedHaberdashery.length - 1]
                                                                    .quantity
                                                            }
                                                            step="1"
                                                            placeholder="ex: 120"
                                                            onChange={onChange}
                                                        ></QuantityInput>
                                                    </QuantityContainer>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* AFFICHAGE DES ARTCLES DE MERCERIE A SELECTIONNER AU DEMARRAGE */}
                                    {haberdasheries && showAllHaberdasheries && selectedHaberdashery.length == 0 && (
                                        <CardsContainer>
                                            {haberdasheries.value.map((haberdashery) => (
                                                <CardsMapContainer
                                                    key={haberdashery.id}
                                                    onClick={() => {
                                                        isOpeningHaberdasheriesCards();
                                                        let habObject = selectedHaberdashery;
                                                        habObject.push(haberdashery);
                                                        setSelectedHaberdashery(habObject);
                                                        setHaberdasheryPreview(haberdashery.photo);
                                                        showAddOneMoreHaberdashery && isOpeningOneMoreHaberdashery();
                                                    }}
                                                >
                                                    <CardContainer key={haberdashery.id} >
                                                        <ImgContainer>
                                                            <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                                                        </ImgContainer>
                                                        <CardText>
                                                            {haberdashery.haberdashery} - {haberdashery.name} - {haberdashery.size} {haberdashery.unity} - qté : {haberdashery.quantity}
                                                        </CardText>
                                                    </CardContainer>
                                                </CardsMapContainer>
                                            ))}
                                        </CardsContainer>
                                    )}

                                    {/* AFFICHAGE FILTRE DES ARTICLES DE MERCERIE RESTANTS A SELECTIONNER */}
                                    {showAllHaberdasheries && selectedHaberdashery.length > 0 && (
                                        <CardsContainer>
                                            {haberdasheriesFiltered.map((haberdashery) => (
                                                <CardsMapContainer
                                                    key={haberdashery.id}
                                                    onClick={() => {
                                                        isOpeningHaberdasheriesCards();
                                                        let habObject = selectedHaberdashery;
                                                        habObject.push(haberdashery);
                                                        setSelectedHaberdashery(habObject);
                                                        setHaberdasheryPreview(haberdashery.photo);
                                                        showAddOneMoreHaberdashery && isOpeningOneMoreHaberdashery();
                                                    }}
                                                >
                                                    <CardContainer key={haberdashery.id}>
                                                        <ImgContainer>
                                                            <CardImg src={haberdashery.photo} alt={haberdashery.alt} />
                                                        </ImgContainer>

                                                        <CardText>
                                                            {haberdashery.haberdashery} - {haberdashery.name} - {haberdashery.size} {haberdashery.unity} - qté : {haberdashery.quantity}
                                                        </CardText>
                                                    </CardContainer>
                                                </CardsMapContainer>
                                            ))}
                                        </CardsContainer>
                                    )}

                                    {showAddOneMoreButton && selectedHaberdashery.length > 0 && (
                                        <AddOneMoreButton onClick={isOpeningOneMoreHaberdashery}>
                                            Sélectionner un article supplémentaire
                                        </AddOneMoreButton>
                                    )}
                                </>
                            )}
                        </Section>

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
