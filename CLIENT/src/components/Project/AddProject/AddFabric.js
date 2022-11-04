import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";import { DeviceSize } from "../../Navbar/Responsive";
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

export const AddFabric = (props) => {

    const {
        values,
        setValues,
        onChange,
        showAddOneMoreButton,
        setShowAddOneMoreButton

      } = props;
    const { persistedReducer } = useSelector((state) => state);

    const fabrics = persistedReducer.fabrics;
    
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


     return (
        <>
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
                                                            // data-selectedfabricquantity={
                                                            //     selectedFabric[selectedFabric.length - 1]
                                                            //         .quantity
                                                            // }
                                                            // data-selectedfabricprice={
                                                            //     selectedFabric[selectedFabric.length - 1]
                                                            //         .price
                                                            // }
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
        </>
     )
    
}