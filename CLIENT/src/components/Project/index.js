import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { storage } from "../../../src/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
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
    AddOneMoreButton
} from "./style";
import YtremaLogo from '../../assets/images/logo.png';





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
    const isOpenFabricSection = () => {
        setShowAllFabrics((prev) => !prev);
        console.log('coucou dans IS Open Fabric Section');
    };


    const [values, setValues] = useState({
        name: '',
        status: '',
        personal_notes: '',
        photo: '',
        fabrics: [],
        haberdasheries: [
            {
                haberdashery_id: '',
                haberdashery_quantity: '',
                haberdashery_is_cut: '',
                haberdashery_price: '',
                haberdashery_used_price: ''
            }
        ],
        patterns: [
            {
                patter_id:''
            }
        ]
        
    });

    const onChange = (event) => {
        console.log(event.target.dataset.selectedfabricid, "event target")
        if(event.target.dataset.selectedfabricid ) {
            console.log('coucou')
            let fabricObject = values;
            fabricObject.fabrics = [{
                fabric_id:event.target.dataset.selectedfabricid,
                fabric_quantity:event.target.dataset.selectedfabricquantity,
                fabric_price: event.target.dataset.selectedfabricprice,
                fabric_used_size: event.target.value,
            }];
            setValues(fabricObject);
            
        } else {
            setValues({...values, [event.target.name]: event.target.value})
        }
        console.log(values, 'values on change');
    };

    //Fabric Preview
    const [selectedFabric, setSelectedFabric] = useState([]);
    const [fabricPreview, setFabricPreview] = useState();
    console.log(selectedFabric, 'selected Fabric')

    //Add one more Fabric
    const addOneMoreFabric = () => {
        
        return(
            <AddOneFabricContainer className="Add One Fabric">
            <PreviewContainer>
                <Text>Sélectionner votre premier tissu</Text>
                <Preview
                    src={fabricPreview !== undefined ? fabricPreview : YtremaLogo}
                >
                </Preview>
                <AddButton
                    onClick={isOpenFabricSection}
                />
                {selectedFabric && (
                    <>
                        <SelectedFabricInfo>{selectedFabric.name} - {selectedFabric.designer} - {selectedFabric.quantity} cm</SelectedFabricInfo>
                        <QuantityContainer>
                            <QuantityLabel htmlFor="fabric_used_size">Quantité</QuantityLabel>
                            <QuantityInput
                                type="number"
                                id="fabric_used_size"
                                name="fabric_used_size"
                                max={selectedFabric.quantity}
                                step="1"
                                placeholder="ex: 120"
                            >

                            </QuantityInput>
                        </QuantityContainer>
                    </>
                )}
            </PreviewContainer>


            {fabrics && showAllFabrics && (
                <AllFabricsContainer className="All Fabrics"

                >
                    {fabrics.value.map((fabric) => (
                        <CardsMapContainer
                            key={fabric.id}
                            onClick={() => {
                                setSelectedFabric(fabric);
                                setFabricPreview(fabric.photo);
                                isOpenFabricSection();
                            }}
                        >
                            <CardContainer
                                key={fabric.id}

                            >
                                <ImgContainer>
                                    <CardImg
                                        src={fabric.photo}
                                        alt={fabric.alt}
                                    />
                                </ImgContainer>

                                <CardText>
                                    {fabric.fabric} - {fabric.name} - {fabric.designer} - {fabric.quantity} cm
                                </CardText>
                            </CardContainer>
                        </CardsMapContainer>
                    ))}
                </AllFabricsContainer>
            )}
            {selectedFabric && (
                <AddOneMoreButton>Sélectionner un tissu supplémentaire</AddOneMoreButton>
            )}

        </AddOneFabricContainer>

        )
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
                            <InformationLabel htmlFor="name">
                                Nom du projet
                            </InformationLabel>
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
                                <option value="" defaultValue>--Choisissez un statut--</option>
                                <option value="Découpe du patron">Découpe du patron</option>
                                <option value="Découpe du tissu">Découpe du tissu</option>
                                <option value="Couture">Couture</option>
                                <option value="Terminé">Terminé</option>
                            </InformationSelect>
                        </LabelInputContainer>
                        <FabricSection>
                            <TitleSectionContainer>
                                <TitleSection>
                                    TISSUS
                                </TitleSection>
                            </TitleSectionContainer>
                            <AddOneFabricContainer>
                                <PreviewContainer>
                                    <Text>Sélectionner votre tissu</Text>
                                    <Preview
                                        src={fabricPreview !== undefined ? fabricPreview : YtremaLogo}
                                    >
                                    </Preview>
                                    <AddButton
                                        onClick={isOpenFabricSection}
                                    />
                                    {selectedFabric && (
                                        <>
                                            <SelectedFabricInfo>{selectedFabric.name} - {selectedFabric.designer} - {selectedFabric.quantity} cm</SelectedFabricInfo>
                                            <QuantityContainer>
                                                <QuantityLabel htmlFor="fabric_used_size">Quantité</QuantityLabel>
                                                <QuantityInput
                                                    type="number"
                                                    id="fabric_used_size"
                                                    data-selectedfabricid= {selectedFabric.id}
                                                    data-selectedfabricquantity = {selectedFabric.quantity}
                                                    data-selectedfabricprice = {selectedFabric.price}
                                                    name="fabric_used_size"
                                                    max={selectedFabric.quantity}
                                                    step="1"
                                                    placeholder="ex: 120"
                                                    onChange={onChange}
                                                >

                                                </QuantityInput>
                                            </QuantityContainer>
                                        </>
                                    )}
                                </PreviewContainer>


                                {fabrics && showAllFabrics && (
                                    <AllFabricsContainer className="All Fabrics"

                                    >
                                        {fabrics.value.map((fabric) => (
                                            <CardsMapContainer
                                                key={fabric.id}
                                                onClick={() => {
                                                    setSelectedFabric(fabric);
                                                    setFabricPreview(fabric.photo);
                                                    isOpenFabricSection();
                                                }}
                                            >
                                                <CardContainer
                                                    key={fabric.id}

                                                >
                                                    <ImgContainer>
                                                        <CardImg
                                                            src={fabric.photo}
                                                            alt={fabric.alt}
                                                        />
                                                    </ImgContainer>

                                                    <CardText>
                                                        {fabric.fabric} - {fabric.name} - {fabric.designer} - {fabric.quantity} cm
                                                    </CardText>
                                                </CardContainer>
                                            </CardsMapContainer>
                                        ))}
                                    </AllFabricsContainer>
                                )}
                                {selectedFabric && (
                                    <AddOneMoreButton
                                        addOneMoreFabric= {addOneMoreFabric}
                                    >Sélectionner un tissu supplémentaire</AddOneMoreButton>
                                )}

                            </AddOneFabricContainer>

                        </FabricSection>

                    </Form>
                </FormContainer>
            </AddProjectContainer>
        </>
    );
};