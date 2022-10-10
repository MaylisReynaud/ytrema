import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../src/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeviceSize } from "../../components/Navbar/Responsive";
import { addAllFabrics } from "../../store/state/fabricSlice";
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
    FabricSection,
    TitleSection,
    TitleSectionContainer,
    AddOneFabricContainer,
    AllFabricsContainer,
    PreviewContainer,
    Preview,
    Text,
    SelectedFabricInfo,
    QuantityLabel,
    QuantityInput,
    QuantityContainer,
    AddOneMoreButton,
    TrashContainer,
    TrashButton,
    TextTrashContainer
} from "./style";
import YtremaLogo from "../../assets/images/logo.png";

export const Project = (props) => {
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
    const isDesktop = useMediaQuery({ minWidth: DeviceSize.tablet });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { persistedReducer } = useSelector((state) => state);
    const auth = persistedReducer.auth;
    const fabrics = persistedReducer.fabrics;

    //Show all fabrics
    const [showAllFabrics, setShowAllFabrics] = useState(false);
    const isOpeningFabricSection = () => {
        setShowAllFabrics((prev) => !prev);
        console.log("coucou dans IS Open Fabric Section");
    };

    const isOpeningOneMoreFabric = (event) => {
        setShowAddOneMoreButton(false);
        !showAddOneMoreFabric && event.preventDefault();
        setShowAddOneMoreFabric((prev) => !prev);
    };

    const [values, setValues] = useState({
        name: "",
        status: "",
        personal_notes: "",
        photo: "",
        fabrics: [],
        haberdasheries: [
            {
                haberdashery_id: "",
                haberdashery_quantity: "",
                haberdashery_is_cut: "",
                haberdashery_price: "",
                haberdashery_used_price: "",
            },
        ],
        patterns: [
            {
                pattern_id: "",
            },
        ],
    });

    const onChange = (event) => {
        console.log(event.target.dataset.selectedfabricid, "event target");
        if (event.target.dataset.selectedfabricid) {
            console.log("coucou");
            let fabricObject = values;
            fabricObject.fabrics = [
                {
                    fabric_id: event.target.dataset.selectedfabricid,
                    fabric_quantity: event.target.dataset.selectedfabricquantity,
                    fabric_price: event.target.dataset.selectedfabricprice,
                    fabric_used_size: event.target.value,
                },
            ];
            setValues(fabricObject);
            setShowAddOneMoreButton(true);
        } else {
            setValues({ ...values, [event.target.name]: event.target.value });
        }
        console.log(values, "values on change");
    };

    //Fabric Preview
    const [selectedFabric, setSelectedFabric] = useState([]);
    const [fabricPreview, setFabricPreview] = useState();
    const [addFabricPreview, setAddFabricPreview] = useState();
    const [showAddOneMoreFabric, setShowAddOneMoreFabric] = useState(false);
    const [showAddOneMoreButton, setShowAddOneMoreButton] = useState(false);
    //Add one more Fabric
    const addOneMoreFabric = (event) => {
        event.preventDefault();
        console.log(event.target, "Je suis dans ajout dun tissu");
        return (
            <AddOneFabricContainer className="Add One Fabric">
                <PreviewContainer>
                    <Text>Sélectionner votre premier tissu</Text>
                    <Preview
                        src={fabricPreview !== undefined ? fabricPreview : YtremaLogo}
                    ></Preview>
                    <AddButton onClick={isOpeningFabricSection} />
                    {selectedFabric.length != 0 && (
                        <>
                            {console.log(selectedFabric, "selectedFabric length")}
                            {selectedFabric.map((selectedFab) => (
                                <>
                                    <SelectedFabricInfo>
                                        {selectedFab.name} - {selectedFab.designer} -{" "}
                                        {selectedFab.quantity} cm
                                    </SelectedFabricInfo>
                                    <QuantityContainer>
                                        <QuantityLabel htmlFor="fabric_used_size">
                                            Quantité
                                        </QuantityLabel>
                                        <QuantityInput
                                            type="number"
                                            id="fabric_used_size"
                                            name="fabric_used_size"
                                            max={selectedFab.quantity}
                                            step="1"
                                            placeholder="ex: 120"
                                        ></QuantityInput>
                                    </QuantityContainer>
                                </>
                            ))}
                        </>
                    )}
                </PreviewContainer>

                {fabrics && showAllFabrics && (
                    <AllFabricsContainer className="All Fabrics">
                        {fabrics.value.map((fabric) => (
                            <CardsMapContainer
                                key={fabric.id}
                                onClick={() => {
                                    setSelectedFabric(...selectedFabric, fabric);
                                    setFabricPreview(fabric.photo);
                                    isOpeningFabricSection();
                                }}
                            >
                                <CardContainer key={fabric.id}>
                                    <ImgContainer>
                                        <CardImg src={fabric.photo} alt={fabric.alt} />
                                    </ImgContainer>

                                    <CardText>
                                        {fabric.fabric} - {fabric.name} - {fabric.designer} -{" "}
                                        {fabric.quantity} cm
                                    </CardText>
                                </CardContainer>
                            </CardsMapContainer>
                        ))}
                    </AllFabricsContainer>
                )}
                {selectedFabric && (
                    <AddOneMoreButton>
                        Sélectionner un tissu supplémentaire
                    </AddOneMoreButton>
                )}
            </AddOneFabricContainer>
        );
    };

    return (
        <>
            <AddProjectContainer>
                <TitleContainer>
                    <Title> CREER VOTRE PROJET</Title>
                </TitleContainer>

                <FormContainer>
                    <Form>
                        <LabelInputContainer className="project title">
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
                        <FabricSection>
                            <TitleSectionContainer>
                                <TitleSection>TISSUS</TitleSection>
                            </TitleSectionContainer>
                            <AddOneFabricContainer>
                                {/* AFFICHAGE DES TISSUS DEJA SELECTIONNES */}
                                <PreviewContainer>
                                    {/* <Text>Tissu sélectionné n°{selectedFabric.length}</Text> */}
                                    {selectedFabric.length == 0 && (
                                        <>
                                            <Text>Sélectionnez votre premier tissu</Text>
                                            <Preview
                                                src={
                                                    fabricPreview !== undefined ? fabricPreview : YtremaLogo
                                                }
                                            ></Preview>
                                        </>
                                    )}
                                    {selectedFabric.length == 0 &&
                                        (<AddButton onClick={isOpeningFabricSection} />)}
                                </PreviewContainer>
                            </AddOneFabricContainer>


                            {selectedFabric.length > 0 ? (
                                <>
                                    {selectedFabric.map((selectedFab, index) => (
                                        <AddOneFabricContainer>
                                            <PreviewContainer key={selectedFab.id}>
                                                <TextTrashContainer> <Text>Tissu sélectionné n°{index + 1}</Text>
                                                    <TrashContainer>
                                                        <TrashButton />
                                                    </TrashContainer>
                                                </TextTrashContainer>
                                                <Preview src={selectedFab.photo}></Preview>
                                                <SelectedFabricInfo>
                                                    {selectedFab.name} - {selectedFab.designer} -{" "}
                                                    {selectedFab.quantity} cm
                                                </SelectedFabricInfo>
                                                <QuantityContainer>
                                                    <QuantityLabel htmlFor="fabric_used_size">
                                                        Quantité
                                                    </QuantityLabel>
                                                    <QuantityInput
                                                        type="number"
                                                        id="fabric_used_size"
                                                        data-selectedfabricid={selectedFab.id}
                                                        data-selectedfabricquantity={selectedFab.quantity}
                                                        data-selectedfabricprice={selectedFab.price}
                                                        name="fabric_used_size"
                                                        max={selectedFab.quantity}
                                                        step="1"
                                                        placeholder="ex: 120"
                                                        onChange={onChange}
                                                    ></QuantityInput>
                                                </QuantityContainer>
                                            </PreviewContainer>
                                        </AddOneFabricContainer>
                                    ))}
                                </>
                            ) : null}


                            {/* AJOUT TISSU SUPP */}

                            {showAddOneMoreFabric && (
                                <AddOneFabricContainer>
                                    <PreviewContainer >
                                        <Text>Sélectionner votre tissu</Text>
                                        <Preview
                                            src={
                                                addFabricPreview !== undefined
                                                    ? addFabricPreview
                                                    : YtremaLogo
                                            }
                                        ></Preview>
                                        <AddButton onClick={isOpeningFabricSection} />
                                        {selectedFabric >= 1 && (
                                            <>
                                                <SelectedFabricInfo>
                                                    {selectedFabric[selectedFabric.length - 1].name} -{" "}
                                                    {selectedFabric[selectedFabric.length - 1].designer} -{" "}
                                                    {selectedFabric[selectedFabric.length - 1].quantity} cm
                                                </SelectedFabricInfo>
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
                                                            selectedFabric[selectedFabric.length - 1].quantity
                                                        }
                                                        data-selectedfabricprice={
                                                            selectedFabric[selectedFabric.length - 1].price
                                                        }
                                                        name="fabric_used_size"
                                                        max={
                                                            selectedFabric[selectedFabric.length - 1].quantity
                                                        }
                                                        step="1"
                                                        placeholder="ex: 120"
                                                        onChange={onChange}
                                                    ></QuantityInput>
                                                </QuantityContainer>
                                            </>
                                        )}
                                    </PreviewContainer>
                                </AddOneFabricContainer>)}


                            {fabrics && showAllFabrics && (
                                <AllFabricsContainer className="All Fabrics">
                                    {fabrics.value.map((fabric) => (
                                        <CardsMapContainer
                                            key={fabric.id}
                                            onClick={() => {
                                                isOpeningFabricSection();
                                                let object = selectedFabric;
                                                object.push(fabric);
                                                setSelectedFabric(object);
                                                setFabricPreview(fabric.photo);
                                                showAddOneMoreFabric && isOpeningOneMoreFabric();
                                            }}
                                        >
                                            {console.log(
                                                selectedFabric,
                                                "selectedFabric dans cards map container"
                                            )}
                                            <CardContainer key={fabric.id}>
                                                <ImgContainer>
                                                    <CardImg src={fabric.photo} alt={fabric.alt} />
                                                </ImgContainer>

                                                <CardText>
                                                    {fabric.fabric} - {fabric.name} - {fabric.designer}{" "}
                                                    - {fabric.quantity} cm
                                                </CardText>
                                            </CardContainer>
                                        </CardsMapContainer>
                                    ))}
                                </AllFabricsContainer>
                            )}

                            {showAddOneMoreButton && (
                                <AddOneMoreButton onClick={isOpeningOneMoreFabric}>
                                    Sélectionner un tissu supplémentaire
                                </AddOneMoreButton>
                            )}

                        </FabricSection>
                    </Form>
                </FormContainer>
            </AddProjectContainer>
        </>
    );
};
