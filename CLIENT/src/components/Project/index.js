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
    RemoveButton,
    MinusIcon,
    PlusIcon
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

    //show one section
    const [showSection, setShowSection] = useState(true);
    const isOpeningSection = () => {
        setShowSection((prev) => !prev);
    };

    //Show all fabrics
    const [showAllFabrics, setShowAllFabrics] = useState(false);
    const isOpeningFabricSection = () => {
        setShowAllFabrics((prev) => !prev);
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

        if (event.target.dataset.selectedfabricid) {
            let fabricObject = values;
            fabricObject.fabrics.push(
                {
                    fabric_id: event.target.dataset.selectedfabricid,
                    fabric_quantity: event.target.dataset.selectedfabricquantity,
                    fabric_price: event.target.dataset.selectedfabricprice,
                    fabric_used_size: event.target.value,
                }
            )

            // keep last fabric object with same the id
            let fabricsResult =   [...fabricObject.fabrics.reduce((acc, cur) => {
                return acc.set(cur.fabric_id, cur);
            }, new Map()).values()]; 

            fabricObject.fabrics = fabricsResult;
            setValues(fabricObject);
            console.log(fabricObject, 'fabric object')
            setShowAddOneMoreButton(true);
        } else {
            setValues({ ...values, [event.target.name]: event.target.value });
        };
    };

    //Fabric Preview
    const [selectedFabric, setSelectedFabric] = useState([]);
    const [fabricPreview, setFabricPreview] = useState();
    const [addFabricPreview, setAddFabricPreview] = useState();
    const [showAddOneMoreFabric, setShowAddOneMoreFabric] = useState(false);
    const [showAddOneMoreButton, setShowAddOneMoreButton] = useState(false);
   
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
                                {showSection ? (
                                    <MinusIcon onClick={isOpeningSection} />
                                )
                                    :
                                    (
                                        <PlusIcon onClick={isOpeningSection} />
                                    )}
                            </TitleSectionContainer>
                            {showSection && (
                                <>
                                    <AddOneFabricContainer>
                                        {/* AFFICHAGE DES TISSUS DEJA SELECTIONNES */}
                                        <PreviewContainer>
                                            {selectedFabric.length == 0 && (
                                                <>
                                                {console.log(selectedFabric, "selectedFabric dans selectionnez votre 1er tissu")}
                                                    <Text>Sélectionnez votre premier tissu</Text>
                                                    <Preview
                                                        src={YtremaLogo}
                                                    ></Preview>

                                                </>
                                            )}
                                            {selectedFabric.length == 0 &&
                                                (<AddButton onClick={isOpeningFabricSection} />)}
                                        </PreviewContainer>
                                    </AddOneFabricContainer>

                                    {console.log(selectedFabric, "selectedFabric")}
                                    {selectedFabric.length > 0 ? (
                                        <>
                                            {selectedFabric.map((selectedFab, index) => (
                                                <AddOneFabricContainer key={selectedFab.id}>
                                                    <PreviewContainer >
                                                        <Text>Tissu sélectionné n°{index + 1}</Text>
                                                        <Preview src={selectedFab.photo}></Preview>
                                                        <RemoveButton
                                                            onClick={() => {
                                                                console.log(values, 'values dans remove button')
                                                                setSelectedFabric(current =>
                                                                    current.filter(fabric => {
                                                                        return fabric.id !== selectedFab.id
                                                                    }),
                                                                );
                                                                let updatedFabrics = values.fabrics.filter(fabric => {
                                                                        return fabric.fabric_id != selectedFab.id
                                                                    })
                                                                    let valuesUpdated = values;
                                                                    valuesUpdated.fabrics = updatedFabrics;
                                                                setValues(valuesUpdated);
                                                            }}
                                                        />
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

                                    {showAddOneMoreButton && selectedFabric.length > 0  && (
                                        <AddOneMoreButton onClick={isOpeningOneMoreFabric}>
                                            Sélectionner un tissu supplémentaire
                                        </AddOneMoreButton>
                                    )}

                                </>
                            )}

                        </FabricSection>
                    </Form>
                </FormContainer>
            </AddProjectContainer>
        </>
    );
};
